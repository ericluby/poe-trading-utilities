var fetch = require('node-fetch');
const alert = require('alert-node');

async function getExaltToChaosConversion(rawInput){
  const input = Number(rawInput);
  const exaltDataJSON = await fetch('https://poe.ninja/api/data/currencyhistory?league=Metamorph&type=Currency&currencyId=2')
  .then(r => r.json());
  const exaltPriceInChaos = exaltDataJSON.receiveCurrencyGraphData[exaltDataJSON.receiveCurrencyGraphData.length-1].value
  alert(`${(exaltPriceInChaos * input).toFixed(1)} chaos`);
};

getExaltToChaosConversion(process.argv[2]);
