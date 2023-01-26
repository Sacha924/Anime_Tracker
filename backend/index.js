const express = require('express')
const app = express()
const animeController = require('./animes/animes_controller')
const port = 3000

app.use('/test', animeController )


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})