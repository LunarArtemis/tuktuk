module.exports = (sequelize, DataType) => {
    const Image = sequelize.define("image" ,{
        type:{
            type: DataType.STRING
        },
        name:{
            type: DataType.STRING
        },
        data:{
            type: DataType.BLOB('long')
        },
        tag_img:{
            type: DataType.STRING
        }
    })
    return Image;
}