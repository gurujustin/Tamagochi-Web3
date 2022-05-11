// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Food.sol";

contract Pet is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    Food public food;
    
    mapping(uint256 => uint256) public starve;
    mapping(address => uint256[]) public petsOf;

    modifier onlyToken() {
        require(
            _msgSender() == address(food),
            "Only token is allowed to perform this operation"
        );
        _;
    }

    constructor(Food _food) ERC721("Pet", "PET") {
        food = _food;
    }

    function mint(string memory _tokenURI) external {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _safeMint(_msgSender(), tokenId);
        _setTokenURI(tokenId, _tokenURI);
        starve[tokenId] = block.timestamp + 4 hours;
    }

    function feed(uint256 tokenId) external onlyToken {
        require(starve[tokenId] > block.timestamp, "Pet is death");
        starve[tokenId] = block.timestamp + 4 hours;
    }
}
