module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "author",
      validate: {
        notEmpty: true,
      },
    },
  };
  const AuthorModel = connection.define("Author", schema);

  return AuthorModel;
};
