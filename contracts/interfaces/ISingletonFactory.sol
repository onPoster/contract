// SPDX-License-Identifier: LGPL-3.0-only

pragma solidity 0.8.0;

interface ISingletonFactory {
     /// @dev Deploys `_initCode` using `_salt` for defining the deterministic address.
     /// @param _initCode Initialization code.
     /// @param _salt Arbitrary value to modify resulting address.
     /// @return createdContract Created contract address.
    function deploy(bytes memory _initCode, bytes32 _salt) external returns (address payable createdContract);
}
