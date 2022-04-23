// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Market.sol";

contract Food is Context, ERC20 {
    address _creator;

    constructor() ERC20("Food", "FOOD") {
        _creator = msg.sender;
    }

    function creator() external view returns (address) {
        return _creator;
    }

    function mint(address to, uint256 amount) external virtual {
        require(_msgSender() == _creator,
            "Only creator can mint new tokens"
        );
        _mint(to, amount);
    }
}
