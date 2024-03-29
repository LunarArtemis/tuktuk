const Images = require('../src/models/images.model');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

describe('Image Model', () => {
    beforeAll(async () => {
        const url = process.env.MONGODB_URI;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });
    afterAll(async () => {
        await Images.deleteMany({ title: /test|Test/ });
        await mongoose.connection.close();
    });
    it('should create a new image', async () => {
        const image = new Images({ title: 'test', type: 'test', description: 'test', filename: 'test', uploaded_by: 'test', filepath: 'test', tags: ['test'] });
        await image.save();
        const foundImage = await Images.findOne({ title: 'test' });
        expect(foundImage.title).toBe('test');
    });

    it('should find an image by title', async () => {
        const foundImage = await Images.findOne({ title: 'test' });
        expect(foundImage.title).toBe('test');
    });

    it('should update an image', async () => {
        const image = await Images.findOne({ title: 'test' });
        image.title = 'updatedTest';
        await image.save();
        const foundImage = await Images.findOne({ title: 'updatedTest' });
        expect(foundImage.title).toBe('updatedTest');
    });

    it('should delete an image', async () => {
        await Images.deleteOne({ title: 'updatedTest' });
        const image = await Images.findOne({ title: 'updatedTest' });
        expect(image).toBeNull();
    });

    it('should not find a non-existing image', async () => {
        const image = await Images.findOne({ title: 'nonExisting' });
        expect(image).toBeNull();
    });
});