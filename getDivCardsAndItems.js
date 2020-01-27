if (typeof window === 'undefined'){
  var fetch = require('node-fetch');
}; //else we are in a browser
// main function
async function getDivCardsAndItems(){
  return [
    {
      "matchingUniqueDivCard": {
        "name": "The Mayor",
        "stackSize": 5,
        "chaos": 19,
        "explicitModifiers": "<uniqueitem>{The Perandus Manor}",
        "uniqueItem": "The Perandus Manor"
      },
      "combinedItem": {
        "name": "The Perandus Manor",
        "stackSize": 0,
        "chaos": 115
      },
      "divCardStackPrice": 95,
      "profitMargin": 20
    },
    {
      "matchingUniqueDivCard": {
        "name": "The Professor",
        "stackSize": 4,
        "chaos": 6,
        "explicitModifiers": "<uniqueitem>{The Putrid Cloister}",
        "uniqueItem": "The Putrid Cloister"
      },
      "combinedItem": {
        "name": "The Putrid Cloister",
        "stackSize": 0,
        "chaos": 60
      },
      "divCardStackPrice": 24,
      "profitMargin": 36
    },
    {
      "matchingUniqueDivCard": {
        "name": "The Landing",
        "stackSize": 5,
        "chaos": 9,
        "explicitModifiers": "<uniqueitem>{The Beachhead}\n<default>{Map Tier:} <normal>{15}\n<corrupted>{Corrupted}",
        "uniqueItem": "The Beachhead"
      },
      "combinedItem": {
        "name": "The Beachhead",
        "stackSize": 0,
        "chaos": 56
      },
      "divCardStackPrice": 44,
      "profitMargin": 12
    }
  ] // sample data to delete later
  // fetch the div card
  const divCardResponseJson = await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=DivinationCard&language=en').then(r => r.json());
  // single out div card
  const divCardJson = divCardResponseJson.lines;
  const uniqueDivCards = divCardJson.map(function(item){
    if (item.explicitModifiers[0]) {
      // return item.explicitModifiers[0].text
      const divCard = {
        name: item.name,
        stackSize: item.stackSize,
        chaos: Math.round(item.chaosValue),
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
  // console.log('uniqueDivCards' , uniqueDivCards);
  // fetch the unique Accessories
  const uniqueAccessories = (await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueAccessory&language=en').then(r => r.json())).lines;
  const uniqueMaps = (await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueMap&language=en').then(r => r.json())).lines;
  const uniqueFlasks = (await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueFlask&language=en').then(r => r.json())).lines;
  const uniqueJewels = (await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueJewel&language=en').then(r => r.json())).lines;
  const uniqueArmours = (await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueArmour&language=en').then(r => r.json())).lines;
  const uniqueWeapons = (await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueWeapon&language=en').then(r => r.json())).lines;
  const uniqueItems = [].concat(uniqueMaps, uniqueFlasks, uniqueJewels, uniqueAccessories, uniqueArmours, uniqueWeapons);

  // single out item
  const cardAndItemDatas = uniqueItems.map(function (uniqueItem) {
    const combinedItem = {
      name: uniqueItem.name,
      stackSize: uniqueItem.stackSize,
      chaos: Math.round(uniqueItem.chaosValue)
    };
    const matchingUniqueDivCard = uniqueDivCards.find(divCard => divCard.uniqueItem === combinedItem.name);
    if (!matchingUniqueDivCard){
      return false;
    }
    // calculating profit margins
    const divCardStackPrice = Math.round(matchingUniqueDivCard.stackSize * matchingUniqueDivCard.chaos);
    const profitMargin = combinedItem.chaos - divCardStackPrice;
    const cardAndItemData = {
      matchingUniqueDivCard,
      combinedItem.name,
      combinedItem.stackSize,
      divCardStackPrice,
      profitMargin
    };
    return cardAndItemData;
    // console.log(`By flipping ${matchingUniqueDivCard.name} into ${combinedItem.name} you can make ${Math.round(profitMargin)} chaos.`);
  }).filter(Boolean);
  return cardAndItemDatas;
};
module.exports = getDivCardsAndItems;
// getDivCardsAndItems();
