const Image = require('../models/images.model.js');
const UserModel = require('../models/User.js');
const path = require("path");

module.exports = async (req, res) => {
    try {
        let messageUpdate = null
        if(req.query.status){
            messageUpdate = req.query.status
        }
        const user = await UserModel.findById(req.session.userId);
        if (user.role == 'member') {
            const images = await Image.find({ uploaded_by: req.session.userId });
            res.render(path.join(`${__dirname}/../views/edit.ejs`), { 
                images, messageUpdate: messageUpdate
            });
        }else if(user.role == 'admin' || user.role == 'staff'){
            const images = await Image.find();
            res.render(path.join(`${__dirname}/../views/edit.ejs`), { 
                images, messageUpdate: messageUpdate
            });
        }else{
            res.redirect('/login')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}