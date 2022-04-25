const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Food Token', async () => {
    let deployer, randomAcc;
    let FoodTokenFactory, FoodToken;

    beforeEach(async () => {
        [deployer, randomAcc] = await ethers.getSigners();

        FoodTokenFactory = await ethers.getContractFactory('Food');
        FoodToken = await FoodTokenFactory.deploy();
    });

    describe('Upon deployment', () => {
        it('should save market', async () => {
            expect(await FoodToken.market()).to.equal(deployer.address);
        });
    });

    describe('Minting', () => {
        it('should be restricted for creator-only (market-only)', async () => {
            await FoodToken.connect(deployer).mint(deployer.address, 1);
            expect(await FoodToken.balanceOf(deployer.address)).to.equal(1);
        });

        it('should revert when non-creator', () => {
            expect(FoodToken.connect(randomAcc).mint(randomAcc.address, 1))
                .to.be.revertedWith('Only creator can mint new tokens');
        });
    });

    describe('Feeding', () => {
        it('should revert if less than 1 FOOD', async () => {
            const petId = 1;
            expect(FoodToken.feedPet(petId, ethers.utils.parseEther('0.009')))
                .to.be.revertedWith('Cannot feed pet with less than 1 FOOD');
        });

    });

});