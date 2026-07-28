const express = require('express')
const app = express()
const booksRouter = require('./routes/books')
const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')


app.use(express.json())
app.use(logger) //сначала логгер!
app.use('/api/books', booksRouter)


app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: 'test@mail.ru' })
})

app.use(error404)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 server running on http://localhost:${PORT}`)
})
