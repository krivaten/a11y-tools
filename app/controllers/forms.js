import Ember from 'ember';

export default Ember.Controller.extend({
    chickenTest: true,
    nutrientTest: 'Vitamin D',
    postalTest: null,
    currencyTest: null,

    submitted: false,
    changeset: {},

    value: 'Test',
    actions: {
        validateProperty: () => {
        }
    }
});
