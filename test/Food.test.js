const { expect } = require("chai");

describe('Food Token', () => {
    it('Should set correct name and symbol', async () => {
        const FoodTokenFactory = await ethers.getContractFactory('Food');
        const FoodToken = await FoodTokenFactory.deploy();
        expect(await FoodToken.name()).to.equal('Food');
        expect(await FoodToken.symbol()).to.equal('FOOD');
    });
});