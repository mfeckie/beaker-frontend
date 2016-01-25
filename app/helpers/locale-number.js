import Ember from 'ember';

export function localeNumber(params, hash) {
  return params.toLocaleString();
}

export default Ember.Helper.helper(localeNumber);
