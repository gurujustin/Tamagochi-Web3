const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Pet', () => {
    let deployer, randomAcc;
    let Pet;
    let FoodToken;

    beforeEach(async () => {
        [deployer, randomAcc] = await ethers.getSigners();

        MarketFactory = await ethers.getContractFactory('Market');
        Market = await MarketFactory.deploy();

        FoodToken = await ethers.getContractAt('Food', await Market.token());
        Pet = await ethers.getContractAt('Pet', await Market.pet());
    });

    describe('Upon deployment', () => {
        it('should save food token', async () => {
            expect(await Pet.food()).to.equal(FoodToken.address);
        });
    });
});