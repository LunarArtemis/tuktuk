// Import any necessary modules or dependencies
const UserModel = require('../models/User.js');
const Image = require('../models/images.model');
// Define the middleware function
const deleteImageMiddleware = async (req, res, next) => {
    // Check if the user is authenticated and has the necessary permissions
    if (req.session.userId && req.params.id) {
        const userId = req.session.userId;
        const imageId = req.params.id;
        const User = await UserModel.findById(userId);
        try {
            let image = null
            if(User.role == 'member') {
                image = await Image.findOne({ _id: imageId, uploaded_by: userId });
            }else if(User.role == 'admin' || User.role == 'staff'){
                image = await Image.findOne({ _id: imageId });
            }
            if (!image) {
                // If the image doesn't exist or the user doesn't own it, return an error response
                console.log('You are not authorized to delete this image.');
                res.status(403).json({ error: "You are not authorized to delete this image or image doesn't exit." });
            } else {
                next();
            }
        } catch (err) {
            // Handle the error
            console.log(err);
            res.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        console.log('You are not authorized to delete this image.');
        res.status(403).json({ error: 'You are not authorized to delete this image.' });
    }
};

module.exports = deleteImageMiddleware;