module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            len: [8,99],
        }
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  // console.log(schema);
  return ReaderModel;
};
