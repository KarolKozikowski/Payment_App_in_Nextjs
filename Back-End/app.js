const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next)=>{
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();
  console.log(time, method, url);
  next();
})

app.get('/', (req, res) => {
  res.send('Payment tracking API in Express.js');
});

const expensesRouter = require('./routes/expenses');
app.use('/expenses', expensesRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server hosted on port: ${PORT}`);
});