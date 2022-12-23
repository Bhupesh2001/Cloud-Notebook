const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')


connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.get('/', (req, res) => {
  res.send('Hello Aman!')
})

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`MacNotebook backend listening at http://localhost:${port}`)
})
