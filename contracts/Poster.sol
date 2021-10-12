/*

██████╗  ██████╗ ███████╗████████╗███████╗██████╗
██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██║   ██║███████╗   ██║   █████╗  ██████╔╝
██╔═══╝ ██║   ██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ╚██████╔╝███████║   ██║   ███████╗██║  ██║
╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

A ridiculously simple general purpose social media smart contract.
It takes a string and tags as parameters and emits the string, tags, and _msgSender() as an event. That's it.
(It's also compatible with metatransactions)

Made with ❤️ by Auryn.eth

*/
// SPDX-License-Identifier: LGPL-3.0-only

pragma solidity 0.7.6;

import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract Poster is BaseRelayRecipient{
    event NewPost(address indexed user, string indexed tag, string content);

    function init() public {
        trustedForwarder = 0xD216153c06E857cD7f72665E0aF1d7D82172F494;
    }

    string public override versionRecipient = "2.2.0";

    function post(string calldata content, string calldata tag) public payable {
        emit NewPost(_msgSender(), tag, content);
    }
}
