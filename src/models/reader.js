module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty: true,
            len: [8,99],
        }
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
