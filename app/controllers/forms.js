import Ember from 'ember';

export default Ember.Controller.extend({
    chickenTest: true,
    nutrientTest: 'Vitamin D',
    postalTest: null,
    currencyTest: '123',

    submitted: false,
    changeset: {},

    value: 'Test',
    actions: {
        validateProperty: () => {

            console.log('THIS', ...arguments)
        }
    }
});
