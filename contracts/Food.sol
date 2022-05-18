// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Market.sol";

contract Food is ERC20 {
    Market public market;

    modifier onlyMarket() {
        require(
            _msgSender() == address(market),
            "Only market is allowed to perform this operation"
        );
        _;
    }

    constructor() ERC20("Food", "FOOD") {
        market = Market(_msgSender());
    }

    function mint(address to, uint256 amount) external onlyMarket {
        _mint(to, amount);
    }

    function feedPet(uint256 petId) external {
        _burn(_msgSender(), 10 ** 18);
        market.pet().feed(petId);
    }
}
