// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Food.sol";

contract Pet is ERC721 {
    Food public food;
    mapping(uint256 => uint256) public starve;
    mapping(address => uint256[]) public petsOf;
    mapping(uint256 => string) private _tokenURIs;

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
        uint256 tokenId = getTokenId(msg.sender, _tokenURI);
        _safeMint(_msgSender(), tokenId);
        _tokenURIs[tokenId] = _tokenURI;
        starve[tokenId] = block.timestamp + 4 hours;
    }

    function feed(uint256 tokenId) external onlyToken {
        require(starve[tokenId] > block.timestamp, "Pet is death");
        starve[tokenId] = block.timestamp + 4 hours;
    }

    function getTokenId(address owner, string memory imageUrl)
        public
        pure
        returns (uint256)
    {
        return uint256(keccak256(abi.encodePacked(owner, imageUrl)));
    }
}
