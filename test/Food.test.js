const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Food Token', async () => {
    let deployer, randomAcc;
    let MarketFactory, Market;
    let FoodToken;

    beforeEach(async () => {
        [deployer, randomAcc] = await ethers.getSigners();

        MarketFactory = await ethers.getContractFactory('Market');
        Market = await MarketFactory.deploy();
        FoodToken = await ethers.getContractAt('Food', await Market.token());
    });

    describe('Upon deployment', () => {
        it('should save market', async () => {
            expect(await FoodToken.market()).to.equal(Market.address);
        });
    });

    describe('Minting', () => {
        it('should be restricted for market-only', () => {
            expect(FoodToken.connect(randomAcc).mint(randomAcc.address, 1))
                .to.be.revertedWith('Only creator can mint new tokens');
        });
    });

    describe('Feeding', () => {
        let Pet;

        beforeEach(async () => {
            Pet = await ethers.getContractAt('Pet', await Market.pet());
            Pet.mint('some pet name');
        });

        it('should send pet exactly 1 FOOD token (0.01 ether)', async () => {
            await eventManager(Pet, 'Transfer', async (_, _1, tokenId) => {
                await Market.purchaseFood({
                    value: ethers.utils.parseEther('0.01')
                });

                const beforeFeedBalance = await FoodToken.balanceOf(deployer.address);
                await FoodToken.feedPet(tokenId);
                const afterFeedBalance = await FoodToken.balanceOf(deployer.address);

                return beforeFeedBalance
                    .sub(afterFeedBalance)
                    .eq(await Market.ethToFood(ethers.utils.parseEther('0.01')));
            });
        });

        it('should burn tokens from msg.sender balance', async () => {
            await eventManager(Pet, 'Transfer', async (_, _1, tokenId) => {
                await Market.purchaseFood({
                    value: ethers.utils.parseEther('0.01')
                });

                const beforeFeedBalance = await FoodToken.balanceOf(deployer.address);
                await FoodToken.feedPet(tokenId);
                const afterFeedBalance = await FoodToken.balanceOf(deployer.address);

                return afterFeedBalance.lt(beforeFeedBalance);
            });

        });

        async function eventManager(contract, eventTitle, callback) {
            await new Promise((resolve, reject) => {
                contract.once(eventTitle, async (...args) => {
                    const success = await callback(...args);
                    success ? resolve() : reject();
                });
            });
        };

    });

});