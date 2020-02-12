const express = require('express');
const MoviesService = require('../services/movies');
const { movieIdSchema, createMovieSchema, updateMovieSchema} = require('../utils/schemas/moviesSchema');
const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();

    router.get('/', async function (req, res, next) {
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (e) {
            next(e);
        }
    });

    router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params') , async function (req, res, next) {
        const { movieId } = req.params;

        try {
            const movies = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data: movies,
                message: 'movies one'
            });
        } catch (e) {
            next(e);
        }
    });

    router.post('/', validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;

        try {
            const createMovie = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createMovie,
                message: 'movies create'
            });
        } catch (e) {
            next(e);
        }
    });

    router.put('/:movieId',
        validationHandler({ movieId: movieIdSchema }, 'params'),
        validationHandler(updateMovieSchema),
        async function (req, res, next) {

        const { body: movie } = req;
        const { movieId } = req.params;

        try {
            const updateMoviesId = await moviesService.updateMovie({ movieId, movie });

            res.status(200).json({
                data: updateMoviesId,
                message: 'movies update'
            });
        } catch (e) {
            next(e);
        }
    });

    router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;

        try {
            const deleteMoviesId = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deleteMoviesId,
                message: 'movie delete'
            });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = moviesApi;