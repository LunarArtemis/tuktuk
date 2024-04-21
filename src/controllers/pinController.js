const Image = require('../models/images.model.js');
const User = require('../models/User.js');

const pin = async(req, res) => {
    const data = await Image.findById(req.params.id);
    const user = await User.findById(data.uploaded_by);

    if (user) {
        res.render('pin', { data: data , User: user.username});
    } else {
        res.status(404).send('User not found');
    }
};

module.exports = pin;