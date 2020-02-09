const express = require('express');
const  app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const { logError, errorHandler } = require('./utils/middleware/errorHandler');


app.use(express.json());

moviesApi(app);

app.use(logError);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});
