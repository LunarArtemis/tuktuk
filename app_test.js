// app.js
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  // You can customize the data sent to the homepage template
  const data = {
    pageTitle: 'Website Downloader',
    tagList: ['#programming', '#design', '#technology'], // Example tags
  };

  res.render('homepage', { data });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
