const hre = require("hardhat");

async function main() {
  const assert = require("assert");

  const salt =
    "0x9245db59943806d06245bc7847b3efb2c899d11b621a0f01bb02fd730e33aed2";

  const sfABI = [
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes",
          name: "_initCode",
          type: "bytes"
        },
        {
          internalType: "bytes32",
          name: "_salt",
          type: "bytes32"
        }
      ],
      name: "deploy",
      outputs: [
        {
          internalType: "address payable",
          name: "createdContract",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ];

  const wallet = await hre.ethers.getSigner();
  console.log("Using address: ", wallet.address);

  const singletonDeployer = "0xBb6e024b9cFFACB947A71991E386681B1Cd1477D";
  const singletonFactory = new hre.ethers.Contract(
    "0xce0042B868300000d44A59004Da54A005ffdcf9f",
    sfABI,
    wallet
  );

  // check if singleton factory is deplyed.
  if ((await hre.ethers.provider.getCode(singletonFactory.address)) === "0x") {
    // fund the singleton factory deployer account
    await wallet.sendTransaction({
      to: singletonDeployer,
      value: hre.ethers.utils.parseEther("0.0247")
    });

    // deploy the singleton factory
    await (await hre.ethers.provider.sendTransaction(
      "0xf9016c8085174876e8008303c4d88080b90154608060405234801561001057600080fd5b50610134806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80634af63f0214602d575b600080fd5b60cf60048036036040811015604157600080fd5b810190602081018135640100000000811115605b57600080fd5b820183602082011115606c57600080fd5b80359060200191846001830284011164010000000083111715608d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550509135925060eb915050565b604080516001600160a01b039092168252519081900360200190f35b6000818351602085016000f5939250505056fea26469706673582212206b44f8a82cb6b156bfcc3dc6aadd6df4eefd204bc928a4397fd15dacf6d5320564736f6c634300060200331b83247000822470"
    )).wait();

    assert(
      (await hre.ethers.provider.getCode(singletonFactory.address)) != "0x"
    );
  }
  console.log("Singleton Factory deployed at:", singletonFactory.address);

  const Poster = await hre.ethers.getContractFactory("Poster");

  const targetAddress = await singletonFactory.callStatic.deploy(
    Poster.bytecode,
    salt
  );
  await singletonFactory.deploy(Poster.bytecode, salt, { gasLimit: 3000000 });
  const poster = await hre.ethers.getContractAt("Poster", targetAddress);
  assert(
    (await hre.ethers.provider.getCode(poster.address)) != "0x"
  );
  console.log("Poster deployed to: ", targetAddress);
  const tag = "post";
  const post =
    '{"type":"microblog","text":"Just deployed poster! 🎉"}';
  const tx = await poster.post(post, tag);
  console.log('Transaction Hash', tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
