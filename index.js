const express = require('express');
const app = express();

const PORT =  3000;

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});


app.listen(PORT, () => {
  console.log('Server has been started...');
});
