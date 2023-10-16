const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'drum lyrics belt earth cactus replace shed burden special boring sweet best'
  ,'https://sepolia.infura.io/v3/b0d7e803b01b4846834b06049e7bf224' 
  );
const web3 = new Web3(provider);



web3.eth.net.getId().then((networkId) => {
    switch (networkId) {
      case 1:
        console.log('This is mainnet');
        break;
      case 3:
        console.log('This is the Ropsten test network');
        break;
      case 4:
        console.log('This is the Rinkeby test network');
        break;
      case 42:
        console.log('This is the Kovan test network');
        break;
      default:
        console.log('This is an unknown network');
    }
  });

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
