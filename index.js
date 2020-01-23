const fetch = require('node-fetch');
//get the HTML of the homepage
//card : https://poe.ninja/challenge/divinationcards/the-polymath
//item : https://poe.ninja/challenge/unique-accessories/astramentis-onyx-amulet
const cardURL = 'https://poe.ninja/challenge/divinationcards/the-polymath'
const itemURL = 'https://poe.ninja/challenge/unique-accessories/astramentis-onyx-amulet'

// fetch("https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueAccessory&language=en", {
//   "credentials": "omit",
//   "referrer": "https://poe.ninja/challenge/unique-accessories/astramentis-onyx-amulet",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": null,
//   "method": "GET",
//   "mode": "cors"
// });
//the item
fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueAccessory&language=en')
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    //single out item
    const resultJson = responseJson.lines.filter(item => item.name === 'Astramentis')[0];
    const item = {
      name: item.name,
      stackSize: item.stackSize,
      chaos: item.chaosValue
    }
    console.log(item)
  })
  .catch((error) => {
    console.log(error);
  });
//the div card
fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=DivinationCard&language=en')
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    //single out item
    const resultJson = responseJson.lines.filter(item => item.name === 'The Polymath')[0];
    const divCard = {
      name: item.name,
      stackSize: item.stackSize,
      chaos: item.chaosValue
    }
    console.log(item)
  })
  .catch((error) => {
    console.log(error);
  });
//div card stack price
  //div card stacksize * div card chaosValue
//profit margin
  //item chaosValue - div card stack price
