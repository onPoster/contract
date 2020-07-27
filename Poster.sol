pragma solidity ^0.6.4;

contract Poster {

 event posted(address poster, string content);

 // Emit content as a json string.
 function post(string memory content) public {
   emit posted(msg.sender, content);
 }
}
