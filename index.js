const express = require('express');
const  app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');
const { logError, errorHandler, wrapErrors } = require('./utils/middleware/errorHandler');
const notfoundHandler = require('./utils/middleware/notFoundHandler');


app.use(express.json());

moviesApi(app);
userMoviesApi(app);

app.use(notfoundHandler);

app.use(logError);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});
