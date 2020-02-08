const express = require('express');
const { moviesMock } = require('../utils/mocks/movies');
const MoviesService = require('../services/movies');

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

    router.get('/:movieId', async function (req, res, next) {
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

    router.post('/', async function (req, res, next) {
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

    router.put('/:movieId', async function (req, res, next) {
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

    router.delete('/:movieId', async function (req, res, next) {
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