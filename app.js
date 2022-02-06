const express = require('express')
const app = express()
const port = process.env.PORT || 4000




app.post('/webhook', (req, res) =>{
    console.log('started')
    res.sendStatus(200)} )
    
app.get('/',(req, res) =>{
    console.log('started')
    res.sendStatus(200)} )


app.listen(port)