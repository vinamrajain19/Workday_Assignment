const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log('Database connected.');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});