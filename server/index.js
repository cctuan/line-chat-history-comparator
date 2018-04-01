
const express = require('express')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static('dist'))

app.post('/upload', (req, res) => {
  let body = ''
  req.on('data', (data) => {
    body += data
  })
  req.on('end', () => {
    //
  })
})
app.listen(PORT, () => {
  console.info(`Listen on PORT: ${PORT}`)
})
