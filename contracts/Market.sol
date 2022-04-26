// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Context.sol";
import "./Food.sol";
import "./Pet.sol";

contract Market is Context {
    Food private _food;
    Pet private _pet;

    constructor() {
        _food = new Food();
        _pet = new Pet(_food);
    }

    function token() public view returns (Food) {
        return _food;
    }

    function pet() public view returns (Pet) {
        return _pet;
    }

    function purchaseFood() external payable {
        _food.mint(_msgSender(), ethToFood(msg.value));
    }

    function ethToFood(uint256 amountInEth) public pure returns (uint256) {
        return amountInEth * 100;
    }
}
