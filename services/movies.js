const { moviesMock } = require('../utils/mocks/movies');

class MoviesService {
    async getMovies() {
        const movies = Promise.resolve(moviesMock);
        return movies || [];
    }

    async getMovie() {
        const movie = Promise.resolve(moviesMock[0]);
        return movie || {}
    }

    async createMovie() {
        const createMovieId = Promise.resolve(moviesMock[0].id);
        return createMovieId || {}
    }

    async updateMovie() {
        const updateMovieId = Promise.resolve(moviesMock[0].id);
        return updateMovieId || {}
    }

    async deleteMovie() {
        const deletedMovieId = Promise.resolve(moviesMock[0].id);
        return deletedMovieId || {}
    }
}

module.exports = MoviesService;