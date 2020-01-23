const fetch = require('node-fetch');
// main function
async function main(){
  // fetch the div card
  const divCardResponseJson = await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=DivinationCard&language=en').then(r => r.json());
  // single out div card
  const divCardJson = divCardResponseJson.lines.filter(item => item.name === 'The Polymath')[0];
  const divCard = {
    name: divCardJson.name,
    stackSize: divCardJson.stackSize,
    chaos: divCardJson.chaosValue,
    explicitModifiers: divCardJson.explicitModifiers
  };
//
  let divString = divCard.explicitModifiers[0].text;
  let divArray = divString.split('}')[0].split('{');
  console.log(divArray[0]);
  console.log(divArray[1]);
//
  console.log(divCard);
  // fetch the item
  const combinedItemResponseJson = await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueAccessory&language=en').then(r => r.json());
  // single out item
  const combinedItemJson = combinedItemResponseJson.lines.filter(item => item.name === divArray[1])[0];
  const combinedItem = {
    name: combinedItemJson.name,
    stackSize: combinedItemJson.stackSize,
    chaos: combinedItemJson.chaosValue
  };
  console.log(combinedItem);
  // calculating profit margins
  const divCardStackPrice = divCard.stackSize * divCard.chaos;
  const profitMargin = combinedItem.chaos - divCardStackPrice;
  console.log(`By flipping ${divCard.name} into ${combinedItem.name} you can make ${profitMargin} chaos.`);
};
main();
