const fetch = require('node-fetch');
// main function
async function main(){
  // fetch the div card
  const divCardResponseJson = await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=DivinationCard&language=en').then(r => r.json());
  // single out div card
  //const divCardJson = divCardResponseJson.lines.filter(item => item.name === 'The Polymath')[0];
  const divCardJson = divCardResponseJson.lines;
  const uniqueDivCards = divCardJson.map(function(item){
    if (item.explicitModifiers[0]) {
      // return item.explicitModifiers[0].text
      const divCard = {
        name: item.name,
        stackSize: item.stackSize,
        chaos: item.chaosValue,
        explicitModifiers: item.explicitModifiers[0].text
      };
      let divString = divCard.explicitModifiers;
      let divArray = divString.split('}')[0].split('{'); //index 0 = <uniqueitem>, index 1 = item name
      if (divArray[0] === '<uniqueitem>'){
        divCard.uniqueItem = divArray[1];
        return divCard;
      } else{
        return null
      }
    } else {
      return null
    }
  }).filter(Boolean);
  //console.log('uniqueDivCards' , uniqueDivCards);
  //
  // fetch the item
  const uniqueAccessories = (await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueAccessory&language=en').then(r => r.json())).lines;
  // single out item
  const uniqueAccessoryJson = uniqueAccessories.forEach(function (uniqueAccessory) {
    const combinedItem = {
      name: uniqueAccessory.name,
      stackSize: uniqueAccessory.stackSize,
      chaos: uniqueAccessory.chaosValue
    };
    const matchingUniqueDivCard = uniqueDivCards.find(divCard => divCard.uniqueItem === combinedItem.name);
    if (!matchingUniqueDivCard){
      return;
    }
    // calculating profit margins
    const divCardStackPrice = matchingUniqueDivCard.stackSize * matchingUniqueDivCard.chaos;
    const profitMargin = combinedItem.chaos - divCardStackPrice;
    console.log(`By flipping ${matchingUniqueDivCard.name} into ${combinedItem.name} you can make ${profitMargin} chaos.`);
  });
};
main();
