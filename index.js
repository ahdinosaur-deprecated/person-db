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
      return this.morphMany('Member', 'member');
    },
    toJSON: function (options) {
      options = options || {};
      var json = Bookshelf.Model.prototype.toJSON.call(this, options);
      if (!options.shallow && this.relations.memberOf) {
        json.memberOf = this.related('memberOf').models.map(function (member) {
          return member.toJSON({ related: 'memberOf' });
        });
      }
      return json;
    },
  });
};
