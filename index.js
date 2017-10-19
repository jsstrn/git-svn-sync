const express = require('express')
const bodyParser = require('body-parser')

const hostname = 'http://localhost'
const port = 5000

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => res.send(`Payload URL: ${hostname}:${port}/trigger`))

app.post('/trigger', (req, res) => {
  console.log('commit message:', req.body.commits[0].message)
  res.json(req.body)
})

app.listen(port, function () {
  console.log(`Listening on ${hostname}:${port}`)
})
