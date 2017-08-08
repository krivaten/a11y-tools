import Ember from 'ember';

const {
    Component
} = Ember;

export default Component.extend({
    classNames: [
        'bd(0)',
        'p(0)',
        'm-y(2)'
    ],
    tagName: 'fieldset',

    legend: null
});
