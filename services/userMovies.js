const MongoLib = require('../lib/mongo');

class UserMoviesService {
    constructor() {
        this.collection = 'user-movies';
        this.mongoDb = new MongoLib();
    }

    async getUserMovies({ userId }) {
        const query = userId && { userId };
        const userMovies = await this.mongoDb.getAll(this.collection, query);

        return userMovies || [];
    }

    async createUserMovie({ userMovie }) {
        const createdUserMovieId = await this.mongoDb.getAll(this.collection, userMovie);

        return createdUserMovieId
    }

    async deleteUserMovie({ userMovieId }) {
        const deletedUserMovieId = await this.mongoDb.getAll(this.collection, userMovieId);

        return deletedUserMovieId
    }

}

module.exports = UserMoviesService;