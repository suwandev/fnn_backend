'use strict';

const line = require('@line/bot-sdk');
const { json } = require('body-parser');
const express = require('express');
const res = require('express/lib/response');
const config = require('./config.json');
const pool = require('./database')
const util = require('util');
// create LINE SDK client
const client = new line.Client(config);
// const db = require('./config/db');
const mysql = require('mysql');
const req = require('express/lib/request');
const app = express();

var userPoint =''
var userIds =''

// app.get('/test', (req, res) => {
//     var a = '222aa'
//     let mys = `select * from a where id = '${a}'`
//     console.log('ssss: ' + mys)
//     res.send(mys)
// })

// webhook callback
app.post('/webhook', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  // handle events separately
  Promise.all(req.body.events.map(event => {
    console.log('event', event);
    // check verify webhook event
    if (event.replyToken === '00000000000000000000000000000000' ||
      event.replyToken === 'ffffffffffffffffffffffffffffffff') {
      return;
     }
     return handleEvent(event)
    //else{
    //  // connect database
    // // userIds = event.source.userId //โยนค่า user id ที่ได้จาก webhook เข้าไปค้นใน database
    // // const callbackFunction = util.callbackify(foo); // ใช้ callbackify เพื่อรอให้ทำงานฝั่ง database เสร็จก่อน

    // // callbackFunction((err, ret) => { //เมื่อได้ค่าจาก database แล้วให้เรียกใช้  return handleEvent(event) เพื่อเช็ค event 
    // //     if (err) throw err;
            
    // //     });
    // }
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

// callback function to handle a single event
function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
            var msg =''
            console.log(message.text)
            if(message.text === 'CheckPoint'){
                userIds = event.source.userId //โยนค่า user id ที่ได้จาก webhook เข้าไปค้นใน database
                const callbackFunction = util.callbackify(foo); // ใช้ callbackify เพื่อรอให้ทำงานฝั่ง database เสร็จก่อน
                callbackFunction((err, ret) => { //เมื่อได้ค่าจาก database แล้วให้เรียกใช้  return handleEvent(event) เพื่อเช็ค event 
                    if (err) throw err;
                       
                        msg = {
                            type:'text',
                            text: `You have: ${userPoint} Point`
                        }
                        
                        return  handleText(msg, event.replyToken);
                    });
            }else if(message.text === 'Register'){
                 msg = {
                    type:'text',
                    text: `${event.source.userId}`
                }
                return  handleText(msg, event.replyToken);
            }else{
                msg = {
                    type:'text',
                    text: `${message.text}`
                }
                return  handleText(msg, event.replyToken);
            }
            
        // case 'image':
        //   return handleImage(message, event.replyToken);
        // case 'video':
        //   return handleVideo(message, event.replyToken);
        // case 'audio':
        //   return handleAudio(message, event.replyToken);
        // case 'location':
        //   return handleLocation(message, event.replyToken);
        // case 'sticker':
        //   return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    // case 'follow':
    //   return replyText(event.replyToken, 'Got followed event');

    // case 'unfollow':
    //   return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    // case 'join':
    //   return replyText(event.replyToken, `Joined ${event.source.type}`);

    // case 'leave':
    //   return console.log(`Left: ${JSON.stringify(event)}`);

    // case 'postback':
    //   let data = event.postback.data;
    //   return replyText(event.replyToken, `Got postback: ${data}`);

    // case 'beacon':
    //   const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
    //   return replyText(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

// async function getUser_db(eventUserId){
//     var userGetOnDb=''
//     var con = mysql.createConnection({
//         host: "localhost",
//         user: "suwan",
//         password: "@#Ju!c90#@",
//         database: "fnn_line_db"

//       });
    
//       let sql = `SELECT * FROM vw_customer_point WHERE cus_line_id = '${eventUserId}'`
//     //   console.log(`sql command: ${sql}`)

//       con.connect(function(err) {
//         if (err) throw err;
//          console.log("Connected!");
//          con.query(sql, function (err, result, fields) {
//               if (err) throw err;
//                   var str = JSON.stringify(result);
//                   var json =  JSON.parse(str);
//                   userGetOnDb = json[0].cus_line_id
//                 //   console.log(result);
//               });
      
      
//       });

//     return  userGetOnDb
// }

async function foo(){
    let sql = `SELECT * FROM vw_customer_point WHERE cus_line_id = '${userIds}'`
    // console.log(sql)
    var result = await  pool.query(sql)
    var resultJ = JSON.stringify(result)
    // console.log('result on database222',result[0].cus_point)
    userPoint = result[0].cus_point

    return userPoint
}

function handleText(message, replyToken) {
  return replyText(replyToken, message.text);
}

// function handleImage(message, replyToken) {
//   return replyText(replyToken, 'Got Image');
// }

// function handleVideo(message, replyToken) {
//   return replyText(replyToken, 'Got Video');
// }

// function handleAudio(message, replyToken) {
//   return replyText(replyToken, 'Got Audio');
// }

// function handleLocation(message, replyToken) {
//   return replyText(replyToken, 'Got Location');
// }

// function handleSticker(message, replyToken) {
//   return replyText(replyToken, 'Got Sticker');
// }


const port = config.port;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});