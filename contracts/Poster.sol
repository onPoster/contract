pragma solidity ^0.6.4;

contract Poster {
  event newPost(bytes32 id, address poster, string content);

  function post(string memory content) public {
    bytes32 id = keccak256(abi.encodePacked(msg.sender, blockhash(block.number - 1),gasleft()));
    emit newPost(id, msg.sender, content);
  }
}
