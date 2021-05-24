// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Asset
 * Asset - a contract for my non-fungible assets.
 */
contract Asset is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Asset", "DEA", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "https://n92ep02kd7.execute-api.us-east-2.amazonaws.com/Prod/asset/";
    }
}
