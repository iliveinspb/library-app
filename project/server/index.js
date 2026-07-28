const express = require('express');

const app = express();
app.use(express.json());

const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);


app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});



const PORT = process.env.PORT || 3000;
console.log('13');
app.listen(PORT, () => {
  console.log(`🚀 server running on http://localhost:${PORT}`);
});
