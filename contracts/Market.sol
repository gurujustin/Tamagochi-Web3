// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Context.sol";
import "./Food.sol";

contract Market is Context {
    Food _foodToken;

    constructor() {
        _setFoodToken();
    }

    function _setFoodToken() private {
        require(address(_foodToken) == address(0), "Token already set.");
        _foodToken = new Food();
    }

    function foodToken() external view returns (Food) {
        return _foodToken;
    }

    function purchaseFoodToken() external payable {
        require(
            msg.value >= 0.01 ether,
            "Cannot purchase less than 1 FOOD (1 FOOD = 0.01 ETH)."
        );
        _foodToken.mint(_msgSender(), ethFoodParse(msg.value));
    }

    function ethFoodParse(uint256 amountInEth) public pure returns (uint256) {
        return amountInEth * 100;
    }
}
