pragma solidity ^0.6.4;

contract Poster {

 event newPost(uint id, address poster, string content);

 // Emit content as a json string.
 function post(uint id, string memory content) public {
   emit newPost(id, msg.sender, content);
 }
}
