const path = require('path');
const Image = require('../models/images.model.js');

const countDownload = async (req, res) => {
    let image = await Image.findById(req.params.id);
    if (image) {
        image.downloadCount = (image.downloadCount || 0) + 1;
        await image.save();
        res.download(path.join(__basedir, image.filepath));
    } else {
        res.status(404).send('Not found');
    }
}

module.exports = countDownload;