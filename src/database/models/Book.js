module.exports = (sequelize, dataTypes) => {
  let alias = 'Book';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false
    },
    cover: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    deletedAt:{
      type: dataTypes.DATE
    },
    createdAt:{
      type: dataTypes.DATE
    },
    updatedAt:{
      type: dataTypes.DATE
    },
  };
  let config = {
    tableName: 'books',
    timestamps: true,
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };
  const Book = sequelize.define(alias, cols, config);

  Book.associate = function (models) {
    Book.belongsToMany(models.Author, {
      as: 'authors',
      through: 'BooksAuthors',
      foreingKey: 'BookId',
      otherKey: 'AuthorId',
      timestamps: false
    });
  };

  return Book;
};
