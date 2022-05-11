// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Context.sol";
import "./Food.sol";
import "./Pet.sol";

contract Market is Context {
    Food public token;
    Pet public pet;

    constructor() {
        token = new Food();
        pet = new Pet(token);
    }

    function purchaseFood() external payable {
        require(msg.value > 0);
        token.mint(_msgSender(), ethToFood(msg.value));
    }

    function ethToFood(uint256 amountInEth) public pure returns (uint256) {
        return amountInEth * 100;
    }
}
