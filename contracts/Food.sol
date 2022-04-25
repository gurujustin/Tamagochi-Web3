// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Market.sol";
import "./Pet.sol";

contract Food is ERC20 {
    Market private _market;

    modifier onlyMarket() {
        require(
            _msgSender() == address(_market),
            "Only market is allowed to perform this operation"
        );
        _;
    }

    constructor() ERC20("Food", "FOOD") {
        _market = Market(_msgSender());
    }

    function market() public view returns (Market) {
        return _market;
    }

    function mint(address to, uint256 amount) external onlyMarket {
        _mint(to, amount);
    }

    function feedPet(uint256 petId, uint256 amount) external {
        require(amount >= 0.01 ether, "Cannot feed pet with less than 1 FOOD");
        _burn(_msgSender(), amount);
        _market.pet().feed(petId);
    }
}
