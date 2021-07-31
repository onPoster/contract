// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const zeros =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

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
    await hre.ethers.provider.sendTransaction(
      "0xf9016c8085174876e8008303c4d88080b90154608060405234801561001057600080fd5b50610134806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80634af63f0214602d575b600080fd5b60cf60048036036040811015604157600080fd5b810190602081018135640100000000811115605b57600080fd5b820183602082011115606c57600080fd5b80359060200191846001830284011164010000000083111715608d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550509135925060eb915050565b604080516001600160a01b039092168252519081900360200190f35b6000818351602085016000f5939250505056fea26469706673582212206b44f8a82cb6b156bfcc3dc6aadd6df4eefd204bc928a4397fd15dacf6d5320564736f6c634300060200331b83247000822470"
    );

    console.log("Singleton Factory deployed at: ", singletonFactory.address);
  } else {
    console.log(
      "Singleton Factory already deployed at:",
      singletonFactory.address
    );
  }

  const Poster = await hre.ethers.getContractFactory("Poster");
  const deployTx = await singletonFactory.populateTransaction.deploy(
    Poster.bytecode,
    zeros
  );
  const signedDeployTx = await wallet.signTransaction(deployTx);
  console.log(signedDeployTx);
  const trace = await hre.network.provider.send(
    "debug_traceTransaction",
    deployTx
  );
  console.log(trace);
  const initCodeHash = hre.ethers.utils.solidityKeccak256(
    ["bytes"],
    [Poster.bytecode]
  );
  const poster = await hre.ethers.getContractAt(
    "Poster",
    await hre.ethers.utils.getCreate2Address(
      singletonFactory.address,
      zeros,
      initCodeHash
    )
  );
  console.log(
    "Poster deployed: ",
    await hre.ethers.provider.getCode(poster.address)
  );
  console.log("Poster deployed to: ", poster.address);
  const post = {
    content: [
      {
        type: "microblog",
        text: "just deployed poster."
      }
    ]
  };
  const postTx = await poster.post(post);
  const postTxReceipt = await postTx.wait();
  console.log(postTxReceipt.events);
  // We get the contract to deploy
  // const Poster = await hre.ethers.getContractFactory('Poster');
  // const poster = await Poster.deploy();
  //
  // await poster.deployed();
  //
  // console.log('Poster deployed to:', poster.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
