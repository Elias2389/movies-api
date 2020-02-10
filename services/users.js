const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
    constructor() {
        this.collection = 'users';
        this.mongoDb = new MongoLib();
    }

    async getUser({ email }) {
        const [ user ] = await this.mongoDb.getAll(this.collection, { email });
        return user
    }

    async createUser({ user }) {
        const { name, email, password } = user;
        const hashedPassword = bcrypt.hash(password, 10);

        const createUserId = await this.mongoDb.create(this.collection, {
            name,
            email,
            password: hashedPassword
        });

        return createUserId
    }
}module.exports = UsersService;