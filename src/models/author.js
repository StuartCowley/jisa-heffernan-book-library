module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "author",
      validate: {
        notNull: {
          args: [true],
          msg: "We need an author",
        },
        notEmpty: {
          args: [true],
          msg: "We need an author",
        },
      },
    },
  };
  const AuthorModel = connection.define("Author", schema);

  return AuthorModel;
};
