module.exports = function (Bookshelf) {

  Bookshelf.plugin('registry');

  return Bookshelf.model('Person', {
    tableName: 'people',
  });
};
