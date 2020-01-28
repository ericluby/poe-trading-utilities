if (typeof window === 'undefined'){
  var fetch = require('node-fetch');
}; //else we are in a browser
// main function
async function getDivCardsAndItems(){
  return [{
    id: 0,
    cardName: "The Mayor",
    cardChaos: 18,
    cardStack: 5,
    itemName: "The Perandus Manor",
    itemChaos: 115,
    stackChaos: 90,
    profitMargin: 25
  }, {
    id: 1,
    cardName: "The Professor",
    cardChaos: 7,
    cardStack: 4,
    itemName: "The Putrid Cloister",
    itemChaos: 68,
    stackChaos: 28,
    profitMargin: 40
  }, {
    id: 2,
    cardName: "The Landing",
    cardChaos: 9,
    cardStack: 5,
    itemName: "The Beachhead",
    itemChaos: 60,
    stackChaos: 45,
    profitMargin: 15
  }] // sample data to delete later
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
        explicitModifiers: item.explicitModifiers[0].text,
        divCardRaw: item
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
  const cardAndItemDatas = uniqueItems.map(function (uniqueItem, index) {
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
      id: index,
      cardName: matchingUniqueDivCard.name,
      cardChaos: matchingUniqueDivCard.chaos,
      cardStack: matchingUniqueDivCard.stackSize,
      itemName: combinedItem.name,
      itemChaos: combinedItem.chaos,
      stackChaos: divCardStackPrice,
      profitMargin,
      cardRaw: matchingUniqueDivCard.divCardRaw,
      itemRaw: uniqueItem
    };
    return cardAndItemData;
    // console.log(`By flipping ${matchingUniqueDivCard.name} into ${combinedItem.name} you can make ${Math.round(profitMargin)} chaos.`);
  }).filter(Boolean);
  return cardAndItemDatas;
};
module.exports = getDivCardsAndItems;
// getDivCardsAndItems();
