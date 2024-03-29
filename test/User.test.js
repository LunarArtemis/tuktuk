const User = require('../src/models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')

dotenv.config()

describe('User Model', () => {
     beforeAll(async () => {
        const url = process.env.MONGODB_URI;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });
    afterAll(async () => {
        await User.deleteMany({ username: /test|Test/ });
        await mongoose.connection.close();
    });
    it('should create a new user', async () => {
        const user = new User({ username: 'test', password: 'test123' });
        await user.save();
        const foundUser = await User.findOne({ username: 'test' });
        expect(foundUser.username).toBe('test');
    });

    it('should find a user by username', async () => {
        const foundUser = await User.findOne({ username: 'test' });
        expect(foundUser.username).toBe('test');
    });

    it('should update a user', async () => {
        const user = await User.findOne({ username: 'test' });
        user.username = 'updatedTest';
        await user.save();
        const foundUser = await User.findOne({ username: 'updatedTest' });
        expect(foundUser.username).toBe('updatedTest');
    });

    it('should delete a user', async () => {
        await User.deleteOne({ username: 'updatedTest' });
        const user = await User.findOne({ username: 'updatedTest' });
        expect(user).toBeNull();
    });

    it('should not find a non-existing user', async () => {
        const user = await User.findOne({ username: 'nonExisting' });
        expect(user).toBeNull();
    });

    it('should hash the password before saving', async () => {
        const user = new User({ username: 'hashTest', password: 'test123' });
        await user.save();
        expect(user.password).not.toBe('test123');
    });
});