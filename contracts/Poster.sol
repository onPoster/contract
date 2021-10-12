/*

██████╗  ██████╗ ███████╗████████╗███████╗██████╗
██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██║   ██║███████╗   ██║   █████╗  ██████╔╝
██╔═══╝ ██║   ██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ╚██████╔╝███████║   ██║   ███████╗██║  ██║
╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

A ridiculously simple general purpose social media smart contract.
It takes a string as a parameter and emits that string, along with msg.sender, as an event. That's it.

Made with ❤️ by Auryn.eth

*/
// SPDX-License-Identifier: LGPL-3.0-only

pragma solidity 0.7.6;

import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract Poster is BaseRelayRecipient{
    event NewPost(address indexed user, bytes32 indexed tag, string content);

    function init() public {
        trustedForwarder = 0xD216153c06E857cD7f72665E0aF1d7D82172F494;
    }

    string public override versionRecipient = "2.2.0";

    function post(string calldata content, bytes32 tag) public payable {
        emit NewPost(_msgSender(), tag, content);
    }
}
