module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'Categories',
  });
  // Category.associate = (models) => {
  //   Category.hasMany(models.PostCategory, {
  //     foreignKey: 'categoryId',
  //     as: 'categories',
  //   });
  // };
  return Category;
};
