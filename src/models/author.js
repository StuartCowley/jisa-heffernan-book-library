module.exports = (connection, DataTypes) => {
   
    const schema = {
      author: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
          }
      },
    }; 
    const AuthorModel = connection.define("Author", schema);
  
    return AuthorModel;
  };
  