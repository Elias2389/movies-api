const express = require('express');
const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');
const { userIdSchema } = require('../utils/schemas/usersSchema');
const { movieIdSchema } = require('../utils/schemas/moviesSchema');
const { createUserMovieSchema } = require('../utils/schemas/userMoviesSchema');


function userMoviesApi(app) {
    const router = express.Router();
    app.user('/api/user-movies', router);

    const userMoviesService = new UserMoviesService();

    router.get('/', validationHandler({ userId: userIdSchema }, 'query'),
        async function (req, res, next) {
        const { userId } = req.query

        try {
            const userMovies = await userMoviesService.getUserMovies({ userId });
            res.status(200).json({
                'data': userMovies,
                'message': 'user movies listed'
            });
        } catch (e) {
            next(e)
        }
    });

    router.post('/', validationHandler(createUserMovieSchema), async function (req, res, next) {
        const { 'body': userMovie } = req;
        try {
            const createdUserMovieId = await userMoviesService.createUserMovie({
                userMovie
            });

            res.status(201).json({
                data: createdUserMovieId,
                message: 'user movie created'
            });
        } catch (e) {
            next(e)
        }
    });

    router.detele('/:userMovieId', validationHandler({ userMovieId: userIdSchema  }, 'params'),
        async function (req, res, next) {

        try {
            const deletedUserMovieId = await userMoviesService.deleteUserMovie({ userMovieId })

            res.status(200).json({
                data: deletedUserMovieId,
                message: 'user deleted'
            })
        } catch (e) {
            next(e);
        }
    })

}

module.exports = userMoviesApi;