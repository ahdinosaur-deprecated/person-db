module.exports = function (Bookshelf) {

  Bookshelf.plugin('registry');

  return Bookshelf.model('Person', {
    tableName: 'people',
    memberOfable: function () {
      return this.morphMany('Group', 'memberOfable');
    },
  });
};
