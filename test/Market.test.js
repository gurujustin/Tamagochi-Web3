const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Market', async () => {
    let deployer, randomAcc;
    let MarketFactory, Market;

    beforeEach(async () => {
        [deployer, randomAcc] = await ethers.getSigners();

        PetFactory = await ethers.getContractFactory('Pet');
        Pet = await PetFactory.deploy();

        MarketFactory = await ethers.getContractFactory('Market');
        Market = await MarketFactory.deploy(Pet.address);
    });

    describe.only('Upon deployment', async () => {
        it('should save food token', async () => {
            console.log(Number(await Market.messageData({ data: 1 })));
            expect(await Market.foodToken()).to.not.equal('0x0000000000000000000000000000000000000000');
        });
    });

    describe('Parser', async () => {
        it('should parse ETH to FOOD in 1:100 ratio', async () => {
            expect(await Market.ethFoodParse(ethers.utils.parseEther('0.01'))).to.equal(ethers.utils.parseEther('1'));
        });
    });

    describe('Purchase', async () => {
        it('should mint new tokens', async () => {
            await Market.purchaseFoodToken({ value: ethers.utils.parseEther('0.01') });
            const FoodToken = await ethers.getContractAt('Food', await Market.foodToken());
            expect(Number(await FoodToken.totalSupply())).to.be.greaterThan(0);
        });

        it('should mint new tokens in correct ratio (1:100)', async () => {
            await Market.purchaseFoodToken({ value: ethers.utils.parseEther('0.01') });
            const FoodToken = await ethers.getContractAt('Food', await Market.foodToken());
            expect(await FoodToken.totalSupply()).to.be.equal(ethers.BigNumber.from(String(10 ** 18)));
        });

        it('should add the minted tokens to user balance', async () => {
            await Market.connect(randomAcc).purchaseFoodToken({ value: ethers.utils.parseEther('0.01') });
            const FoodToken = await ethers.getContractAt('Food', await Market.foodToken());
            expect(await FoodToken.balanceOf(randomAcc.address)).to.equal(String(10 ** 18));
        });

        it('should revert if not enough ETH sent', async () => {
            expect(Market.connect(randomAcc).purchaseFoodToken({ value: ethers.utils.parseEther('0.009') }))
                .to.be.revertedWith('Cannot purchase less than 1 FOOD (1 FOOD = 0.01 ETH).');
        });
    });

});