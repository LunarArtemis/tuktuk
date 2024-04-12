const Image = require('../models/images.model.js');
const User = require('../models/User.js');

const countLike = async (req, res) => {
    let image = await Image.findOne({ _id: req.params.id });
    let user = await User.findById(req.session.userId);

    if (image && user) {
        let index = image.likes.indexOf(user._id);
        if (index === -1) {
            image.likes.push(user._id);
            like = true;
        } else {
            image.likes.splice(index, 1);
            like = false;
        }

        await image.save();
        res.json({ success: true, likeCount: image.likes.length, liked: like});
    } else {
        res.status(404).json({ success: false });
    }
};
module.exports = countLike;