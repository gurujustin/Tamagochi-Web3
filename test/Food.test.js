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
        it('Should set correct name and symbol', async () => {
            expect(await FoodToken.name()).to.equal('Food');
            expect(await FoodToken.symbol()).to.equal('FOOD');
        });

        it('Should save creator', async () => {
            expect(await FoodToken.creator()).to.equal(deployer.address);
        });
    });

    describe('Minting', () => {
        it('Should pass when creator', async () => {
            await FoodToken.connect(deployer).mint(deployer.address, 1);
            expect(await FoodToken.balanceOf(deployer.address)).to.equal(1);
        });

        it('Should revert when non-creator', () => {
            expect(FoodToken.connect(randomAcc).mint(randomAcc.address, 1))
                .to.be.revertedWith('Only creator can mint new tokens');
        });
    });

});