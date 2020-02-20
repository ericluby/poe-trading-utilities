const sendSMS = require('./sendSMS.js');
const filePath = 'C:\\Program Files (x86)\\POE\\logs\\Client.txt'

// var {createReadStream} = require('fs')
// var {createInterface} = require('readline')
// var lineReader = createInterface({input: createReadStream(filePath), crlfDelay: Infinity})

const Tail = require('tail').Tail;
const tail = new Tail(filePath, {useWatchFile: true});

const tradeRegex = /(?<date>[^ ]+) (?<time>[^ ]+) .+ @From ((?<guildTag>[^ ]+) )?(?<playerName>[^ ]+): Hi, I would like to buy your (?<item>.+) listed for (?<price>[^ ]+) (?<currencyType>[^ ]+)/;
let numTrades = 0;
let numWorthyTrades = 0;
console.log("im up and running")

tail.on("line", function (line){
  const matched = line.match(tradeRegex)
  if(matched){
    numTrades++
    if(textWorthyTrade(matched.groups) === true){
      numWorthyTrades++;
      console.log(numTrades, numWorthyTrades, matched.groups);
      sendSMS(`${numWorthyTrades}) Someone wants to buy your ${matched.groups.item} for ${matched.groups.price} ${matched.groups.currencyType}.`)
    }else{
      console.log(numTrades, matched.groups);
    }
  }
  return;
})
// .on("close", function(){
//   console.log("\nDone\n")
// })
tail.on("error", function(error) {
  console.error('ERROR: ', error);
});

function textWorthyTrade(groups){
  if((groups.price > 100 && groups.currencyType === 'chaos') || groups.currencyType === 'exa' || groups.currencyType === 'exalted' ){
    return true;
  }else{
    return false;
  }
};
