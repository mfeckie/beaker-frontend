import Ember from 'ember';

export function localeNumber(params) {
  return params.toLocaleString();
}

export default Ember.Helper.helper(localeNumber);
