const fetch = require('node-fetch');
//get the HTML of the homepage
//card : https://poe.ninja/challenge/divinationcards/the-polymath
//item : https://poe.ninja/challenge/unique-accessories/astramentis-onyx-amulet
const cardURL = 'https://poe.ninja/challenge/divinationcards/the-polymath'
const itemURL = 'https://poe.ninja/challenge/unique-accessories/astramentis-onyx-amulet'

//main function
async function main(){
  //fetch the item
  const response = await fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueAccessory&language=en')
  const responseJson = await response.json();
  //single out item
  const resultJson = responseJson.lines.filter(item => item.name === 'Astramentis')[0];
  const combinedItem = {
    name: resultJson.name,
    stackSize: resultJson.stackSize,
    chaos: resultJson.chaosValue
  }
  console.log(combinedItem)

  //fetch the div card
  fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=DivinationCard&language=en')
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      //single out div card
      const resultJson = responseJson.lines.filter(item => item.name === 'The Polymath')[0];
      const divCard = {
        name: resultJson.name,
        stackSize: resultJson.stackSize,
        chaos: resultJson.chaosValue
      }
      console.log(divCard)
    })
    .catch((error) => {
      console.log(error);
    });
}
main();

//div card stack price
  //div card stacksize * div card chaosValue
//profit margin
  //item chaosValue - div card stack price
