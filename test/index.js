var App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter;

App.DataModel = DS.Model.extend({
  name: DS.attr('string'),
  state: DS.attr('string'),
  nickname: DS.attr('string')
});

App.BlahModel = DS.Model.extend({
  name: DS.attr('string'),
  age: DS.attr('number'),
  color: DS.attr('string')
});

App.DataModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'Bob',
      nickname: 'Bobby',
      state: 'CT'
    }, {
      id: 2,
      name: 'Janet',
      nickname: 'Jan',
      state: 'NJ'
    }, {
      id: 3,
      name: 'John',
      nickname: 'J',
      state: 'WY'
    }
  ]
});

App.BlahModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'foo',
      age: 15,
      color: 'red'
    }
  ]
});

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return Ember.RSVP.all([this.store.find('data'), this.store.find('blah')]).then(function (data) {
      return data[0].get('content').concat(data[1].get('content'));
    });
  }
});

App.ApplicationController = Ember.ArrayController.extend({
  defaultColumns: ['Name'],

  columns: [
    Ember.Object.create({ name: 'Name', attributes: ['data:name', 'blah:name'] }),
    Ember.Object.create({ name: 'Age', attributes: ['blah:age'] }),
    Ember.Object.create({ name: 'Nickname', attributes: ['data:nickname'] })
  ],
  datasets: [
    [ 
      { name: 'Bob', state: 'CT', nickname: 'Bobby' },
      { name: 'Janet', state: 'NJ', nickname: 'Jan' }
    ],
    [
      { name: 'John', us_state: 'NY', nickname: 'J' }
    ]
  ]
});
