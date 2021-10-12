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


interface IPoster {
    event NewPost(address indexed user, string content);

    function post(string memory content) external;
}
