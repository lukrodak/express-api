const app = require('express')();
app.use(require('./controllers'));
const port = 8080;
const bodyParser = require('body-parser');

app.listen(port, () => {
    console.log(`Starting server on ${port}`);
});