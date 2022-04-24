const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Pet', () => {
    let deployer, randomAcc;
    let PetFactory, Pet;
    let FoodTokenFactory, FoodToken;

    beforeEach(async () => {
        [deployer, randomAcc] = await ethers.getSigners();
        FoodTokenFactory = await ethers.getContractFactory('Food');
        FoodToken = await FoodTokenFactory.deploy();
        PetFactory = await ethers.getContractFactory('Pet');
        Pet = await PetFactory.deploy(FoodToken.address);
    });

    describe('Upon deployment', () => {
        it('should save food token', async () => {
            expect(await Pet.foodToken()).to.equal(FoodToken.address);
        });
    });
});