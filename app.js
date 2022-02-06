const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const channelToken='h4wNgtErDVOry1IdtLuvH0U/+4lYtezOTBlBj8AHkWLkaJ+ard1RpBSG6l+ViU1dPfvgAl57CLcV1D1QZTSrVCRokltINHnDTxnv+Mx+cttEKuKrJxsEnK1VIYR2CUrkZudl5cAg2itpswJSV5CLXAdB04t89/1O/w1cDnyilFU='
const ChannelSecret='bbda19eae437a7a65c0405c632f8ad67'


app.post('/webhook', (req, res) =>{
        let reply_token = req.body.events[0].replyToken
        reply(reply_token)
        res.sendStatus(200)
    } 
)

app.get('/',(req, res) =>{
    console.log('started')
    res.sendStatus(200)} )

app.get('/webhook',(req, res) =>{
        console.log('started')
        res.sendStatus(200)} ) 


app.listen(port)

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${channelToken}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

