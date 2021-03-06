import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('icons');
  this.route('forms');
  this.route('numbers');
  this.route('currency');
});

export default Router;
