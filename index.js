var uuid = require('node-uuid');

module.exports = function (Bookshelf) {

  Bookshelf.plugin('registry');

  return Bookshelf.model('Person', {
    tableName: 'people',
    defaults: function () {
      return {
        id: uuid(),
        type: "Person",
      };
    },
    memberOf: function () {
      return this.morphMany('Group', 'member');
    },
  });
};
