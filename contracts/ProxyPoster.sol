/*
 _____   ______  _____  _     _ __   __
|_____] |_____/ |     |  \___/    \_/  
|       |    \_ |_____| _/   \_    |   

██████╗  ██████╗ ███████╗████████╗███████╗██████╗
██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██║   ██║███████╗   ██║   █████╗  ██████╔╝
██╔═══╝ ██║   ██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ╚██████╔╝███████║   ██║   ███████╗██║  ██║
╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

A proxy smart contract to allow gasless interactions with Poster.
Since Poster only takes msg.sender, a proxy supporting EIP-2771 is required.

Poster created by Auryn.eth, Proxy Poster by jjperezaguinaga.eth

*/
// SPDX-License-Identifier: LGPL-3.0-only

pragma solidity 0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IPoster.sol";

contract ProxyPoster is OwnableUpgradeable, ERC2771ContextUpgradeable {
    IPoster public posterContract = IPoster(0x0000000000A84Fe7f5d858c8A22121c975Ff0b42);

    function initialize(address trustedForwarder) public initializer {
        __Ownable_init();
        __ERC2771Context_init(trustedForwarder);
    }

    function post(string calldata content) public {
        posterContract.post(string(abi.encodePacked(_msgSender(), content)));
    }

    function _msgSender() internal view virtual override(ContextUpgradeable, ERC2771ContextUpgradeable) returns (address sender) {
        return ERC2771ContextUpgradeable._msgSender();
    }

    function _msgData() internal view virtual override(ContextUpgradeable, ERC2771ContextUpgradeable) returns (bytes calldata) {
        return ERC2771ContextUpgradeable._msgData();
    }
}
