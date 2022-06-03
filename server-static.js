
const express = require('express')
const { path } = require('express/lib/application')
const app = express()
const port = 8080

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(public, 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
