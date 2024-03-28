const User = require('../src/models/User');

describe('User Registration', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {
                username: 'testuser',password: '123'
                // Add other required properties for user creation
            },
            flash: jest.fn(),
            redirect: jest.fn(),
        };

        res = {
            redirect: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should redirect to /login if user already exists', async () => {
        const existingUser = { username: 'testuser' };
        User.findOne = jest.fn().mockResolvedValue(existingUser);

        await require('../src/controllers/storeUserController')(req, res);

        expect(req.flash).toHaveBeenCalledWith('validationErrors', 'User already exists');
        expect(req.flash).toHaveBeenCalledWith('data', req.body);
        expect(res.redirect).toHaveBeenCalledWith('/login');
    });

    it('should create a new user and redirect to /', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);
        User.create = jest.fn().mockResolvedValue();

        await require('../src/controllers/storeUserController')(req, res);

        expect(User.create).toHaveBeenCalledWith(req.body);
        expect(res.redirect).toHaveBeenCalledWith('/');
    });

    it('should handle validation errors when creating a new user', async () => {
        const error = {
            errors: {
                // Add sample validation errors here
            },
        };

        User.findOne = jest.fn().mockResolvedValue(null);
        User.create = jest.fn().mockRejectedValue(error);

        await require('../src/controllers/storeUserController')(req, res);

        expect(req.flash).toHaveBeenCalledWith('validationErrors', expect.any(Array));
        expect(req.flash).toHaveBeenCalledWith('data', req.body);
        expect(res.redirect).toHaveBeenCalledWith('/login');
    });

    it('should handle errors when checking user existence', async () => {
        const error = new Error('Some error message');

        User.findOne = jest.fn().mockRejectedValue(error);

        await require('../src/controllers/storeUserController')(req, res);

        expect(console.log).toHaveBeenCalledWith('Error checking user existence:', error);
        // Add your error handling assertions here
    });
});
