const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Market', async () => {
    let deployer, randomAcc;
    let MarketFactory, Market;

    beforeEach(async () => {
        [deployer, randomAcc] = await ethers.getSigners();

        MarketFactory = await ethers.getContractFactory('Market');
        Market = await MarketFactory.deploy();
    });

    describe('Upon deployment', async () => {
        it('should save food token instance', async () => {
            expect(await Market.token()).to.not.equal('0x0000000000000000000000000000000000000000');
        });

        it('should save pet instance', async () => {
            expect(await Market.pet()).to.not.equal('0x0000000000000000000000000000000000000000');
        });
    });

    describe('Purchase', async () => {
        it('should mint new tokens in correct ratio (1:100)', async () => {
            await Market.purchaseFood({ value: ethers.utils.parseEther('0.01') });
            const FoodToken = await ethers.getContractAt('Food', await Market.token());
            expect(await FoodToken.totalSupply()).to.equal(ethers.utils.parseEther('1'));
        });

        it('should mint the tokens to user balance', async () => {
            await Market.connect(randomAcc).purchaseFood({ value: ethers.utils.parseEther('0.01') });
            const FoodToken = await ethers.getContractAt('Food', await Market.token());
            expect(await FoodToken.balanceOf(randomAcc.address)).to.equal(String(10 ** 18));
        });

    });

});