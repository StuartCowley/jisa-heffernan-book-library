module.exports = (connection, DataTypes) => {
   
    const schema = {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    };
 
    const ReaderModel = connection.define('Reader', schema);
    // console.log(schema);
    return ReaderModel;
};