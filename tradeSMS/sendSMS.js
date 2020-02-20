require('dotenv').config()
const client = require('twilio')(process.env.twilioAccountSid, process.env.twilioAuthToken);

module.exports = sendSMS

function sendSMS(textMessage){
  if(!textMessage){
    return;
  }
  client.messages.create({
     body: textMessage,
     from: process.env.twilioPhoneNumber,
     to: process.env.myPhoneNumber
  }).then(message => console.log(message.sid)).catch(error=> console.error(error));
}
