const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const channelToken='h4wNgtErDVOry1IdtLuvH0U/+4lYtezOTBlBj8AHkWLkaJ+ard1RpBSG6l+ViU1dPfvgAl57CLcV1D1QZTSrVCRokltINHnDTxnv+Mx+cttEKuKrJxsEnK1VIYR2CUrkZudl5cAg2itpswJSV5CLXAdB04t89/1O/w1cDnyilFU='
const ChannelSecret='bbda19eae437a7a65c0405c632f8ad67'


// app.post('/webhook', (req, res) =>{
//         let reply_token = req.body.events[0].replyToken
//         reply(reply_token)
//         res.sendStatus(200)
//     } 
// )

app.get('/',(req, res) =>{
    console.log('started')
    res.sendStatus(200)} )

app.get('/webhook',(req, res) =>{
        console.log('started')
        res.sendStatus(200)} ) 

app.post("/webhook", (req, res) => {
            console.log('req.body =>', JSON.stringify(req.body,null,2)) //สิ่งที่ Line ส่งมา
            res.send("HTTP POST request sent to the webhook URL!")
           
             // ============= เพิ่มเข้ามาใหม่
            if (req.body.events[0].type === "message") {
              // Message data, must be stringified
              const dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [
                  {
                    "type": "text",
                    "text": "Hello, user"
                  },
                  {
                    "type": "text",
                    "text": "May I help you?"
                  }
                ]
              })
          
              // Request header
              const headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + channelToken
              }
          
              // Options to pass into the request
              const webhookOptions = {
                "hostname": "api.line.me",
                "path": "/v2/bot/message/reply",
                "method": "POST",
                "headers": headers,
                "body": dataString
              }
          
              // Define request
              const request = https.request(webhookOptions, (res) => {
                res.on("data", (d) => {
                  process.stdout.write(d)
                })
              })
          
              // Handle error
              request.on("error", (err) => {
                console.error(err)
              })
          
              // Send data
              request.write(dataString)
              request.end()
            }
          })
          
          app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
          })

