```
██████╗  ██████╗ ███████╗████████╗███████╗██████╗
██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██║   ██║███████╗   ██║   █████╗  ██████╔╝
██╔═══╝ ██║   ██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ╚██████╔╝███████║   ██║   ███████╗██║  ██║
╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
```

A ridiculously simple general purpose social media smart contract.
It takes a string as a parameter and emits that string, along with msg.sender, as an event. That's it.

It is intended to be deployed on L2 Ethereum networks, or any EVM compatible network where gas is cheap/free.

Poster v6 has been deployed at `0x0000000000A84Fe7f5d858c8A22121c975Ff0b42` on multiple networks using the [Singleton Factory](https://eips.ethereum.org/EIPS/eip-2470). If it is not yet deployed on your chosen network, you can use the Singleton Factory to deploy an instance of Poster at the same address on just about any EVM compatible network using these parameters:

> **initCode:** `0x608060405234801561001057600080fd5b50610189806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80638ee93cf314610030575b600080fd5b61004361003e366004610099565b610045565b005b3373ffffffffffffffffffffffffffffffffffffffff167f6babe127d1599cad37c523a2dd29c5d02acd7132a883e378a2d9b42ec75a1fa9838360405161008d929190610106565b60405180910390a25050565b600080602083850312156100ab578182fd5b823567ffffffffffffffff808211156100c2578384fd5b818501915085601f8301126100d5578384fd5b8135818111156100e3578485fd5b8660208285010111156100f4578485fd5b60209290920196919550909350505050565b60006020825282602083015282846040840137818301604090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016010191905056fea264697066735822122091369fb6f397ae303a741fb470a163a0384d9152cd15b5887f5f0b68e5a3c8e964736f6c63430008000033`
>
> **salt:** `0x51a9566bdb2664f8cb31cd79d50e2c10ea34f765e27bc8e3ff3c60175ad4cb6c`

When verifying on the source code on a block explorer, make sure to set the optimizer to `yes` and the runs to `10000000`.

---

`Made with ❤️ by Auryn.eth`
