module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "genre",
      validate: {
        notNull: {
          args: [true],
          msg: "We need a genre",
        },
        notEmpty: {
          args: [true],
          msg: "We need a genre",
        },
      },
    },
  };

  const GenreModel = connection.define("Genre", schema);

  return GenreModel;
};
