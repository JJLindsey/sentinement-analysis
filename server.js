const express = require("express")
const bodyParser = require("body-parser")
const sentiment = require("sentiment")

const app = express()
const port = 3002
//middleware
app.use(bodyParser.json())
//endpoint for sentiment analysis
app.post("/analyze-sentiment", (req, res) => {
    const text = req.body.text
    const result = sentiment(text)
    res.json({ sentiment: result.score})
})
//start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
