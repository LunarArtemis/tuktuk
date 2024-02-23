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
        }
    })
    return Image;
}