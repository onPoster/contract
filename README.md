```
██████╗  ██████╗ ███████╗████████╗███████╗██████╗
██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██║   ██║███████╗   ██║   █████╗  ██████╔╝
██╔═══╝ ██║   ██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ╚██████╔╝███████║   ██║   ███████╗██║  ██║
╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
```

A ridiculously simple general purpose social media smart contract.
It takes two strings (content and tag) as parameters and emits those strings, along with msg.sender, as an event. That's it.

It is intended to be deployed on L2 Ethereum networks, or any EVM compatible network where gas is cheap/free.

Poster v7 has been deployed at `0x000000000000cd17345801aa8147b8D3950260FF` on multiple networks using the [Singleton Factory](https://eips.ethereum.org/EIPS/eip-2470). If it is not yet deployed on your chosen network, you can use the Singleton Factory to deploy an instance of Poster at the same address on just about any EVM compatible network using these parameters:

> **initCode:** `0x608060405234801561001057600080fd5b506101f6806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80630ae1b13d14610030575b600080fd5b61004361003e3660046100fa565b610045565b005b8181604051610055929190610163565b60405180910390203373ffffffffffffffffffffffffffffffffffffffff167f6c7f3182d7e4cb876251f9ae1489975fdbbf15d9f35d393f2ac9b1ff57cec69f86866040516100a5929190610173565b60405180910390a350505050565b60008083601f8401126100c4578182fd5b50813567ffffffffffffffff8111156100db578182fd5b6020830191508360208285010111156100f357600080fd5b9250929050565b6000806000806040858703121561010f578384fd5b843567ffffffffffffffff80821115610126578586fd5b610132888389016100b3565b9096509450602087013591508082111561014a578384fd5b50610157878288016100b3565b95989497509550505050565b6000828483379101908152919050565b60006020825282602083015282846040840137818301604090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016010191905056fea2646970667358221220ee0377bd266748c5dbaf0a3f15ebd97be153932f2d14d460d9dd4271fee541b564736f6c63430008000033`
>
> **salt:** `0x9245db59943806d06245bc7847b3efb2c899d11b621a0f01bb02fd730e33aed2`

When verifying on the source code on a block explorer, make sure to set the optimizer to `yes` and the runs to `10000000`.

---

`Made with ❤️ by Auryn.eth`
