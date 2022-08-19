module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    genre: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  };

  const BookModel = connection.define("Book", schema);

  return BookModel;
};
