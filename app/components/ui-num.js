import Ember from 'ember';
import numToWords from 'ally/utils/num-to-words';

const {
  Component,
  computed,
  get
} = Ember;

const UiNum = Component.extend({
  classNames: ['ui-num'],
  tagName: 'span',
  attributeBindings: [
    'label:aria-label'
  ],

  number: null,

  splitAmount: computed('number', function() {
    let number = String(get(this, 'number')) || '0';
    return number.split('.');
  }),

  formattedAmount: computed('splitAmount', function() {
    let splitAmount = get(this, 'splitAmount');

    splitAmount[0] = splitAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return splitAmount.join('.');
  }),

  label: computed('splitAmount', function() {
    let splitAmount = get(this, 'splitAmount');
    let result = [];

    splitAmount.forEach((item) => result.push(numToWords(item)));

    return result.join(' point ');
  })
});

UiNum.reopenClass({
  positionalParams: ['number']
});

export default UiNum;
