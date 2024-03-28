const User = require('../src/models/User');
const StoreUser = require('../src/controllers/storeUserController')
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

        await StoreUser(req,res);

        expect(req.flash).toHaveBeenCalledWith('validationErrors', 'User already exists');
        expect(req.flash).toHaveBeenCalledWith('data', req.body);
        expect(res.redirect).toHaveBeenCalledWith('/login');
    });

    it('should create a new user and redirect to /', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);
        User.create = jest.fn().mockResolvedValue(req.body);

        await StoreUser(req,res);
        await User.create(req.body);
        console.log(res.redirect.mock.calls);
        expect(res.redirect).toHaveBeenCalledWith('/');
    });

    it('should handle validation errors when creating a new user', async () => {
    const error = {
        errors: {
            // Sample validation errors
            username: { message: 'Username is required.' },
            password: { message: 'Password must be at least 6 characters long.' },
            // Add more sample validation errors as needed
        },
    };

    User.findOne = jest.fn().mockResolvedValue(null);
    User.create = jest.fn().mockRejectedValue(error);

    await StoreUser(req,res);

    // Extract validation errors from the error object
    const validationErrors = Object.values(error.errors).map(err => err.message);
    // Expect req.flash to have been called with the validation errors
    //expect(req.flash).toHaveBeenCalledWith('validationErrors', validationErrors);
    //expect(req.flash).toHaveBeenCalledWith('data', req.body);
    expect(res.redirect).toHaveBeenCalledWith('/login');
});

    it('should handle errors when checking user existence', async () => {
        const error = new Error('Some error message');

        User.findOne = jest.fn().mockRejectedValue(error);

        await StoreUser(req,res);
        
        expect(console.log).toHaveBeenCalledWith('Error checking user existence:',error);
        // Add your error handling assertions here
    });
});
