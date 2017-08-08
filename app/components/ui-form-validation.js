import Ember from 'ember';
import layout from '../templates/components/ui-form-validation';

const {
    get,
    assert,
    computed,
    isPresent,
    Component,
} = Ember;

const PROPERTY_MSG = 'You must include a "property" attribute in all uses of "{{ui-form-validation}}".';
const SUBMITTED_MSG = 'You must include a "submitted" attribute in all uses of "{{ui-form-validation}}".';
const VALIDATEPROP_MSG = 'You must include a "validateProperty" attribute in all uses of "{{ui-form-validation}}".';
const CHANGESET_MSG = 'You must include a "changeset" attribute in all uses of "{{ui-form-validation}}".';

export default Component.extend({
    focused: 0,
    layout: layout,
    testId: 'uiFormValidation',
    attributeBindings: ['testId:test-id'],
    classNames: ['ui-form-validation'],
    classNameBindings: ['validForm::is-invalid'],

    verifyPresence: (value, message) => assert(message, isPresent(value)),

    init() {
        this._super(...arguments);
        let property = get(this, 'property');
        this.verifyPresence(property, PROPERTY_MSG);
        let submitted = get(this, 'submitted');
        this.verifyPresence(submitted, SUBMITTED_MSG);
        let validateProperty = get(this, 'validateProperty');
        this.verifyPresence(validateProperty, VALIDATEPROP_MSG);
        let changeset = get(this, 'changeset');
        this.verifyPresence(changeset, CHANGESET_MSG);
    },

    property: computed({
        get() {
            return null;
        },
        set(key, property) {
            this.verifyPresence(property, PROPERTY_MSG);
            return property;
        },
    }),

    submitted: computed({
        get() {
            return null;
        },
        set(key, submitted) {
            this.verifyPresence(submitted, SUBMITTED_MSG);
            return submitted;
        },
    }),

    validateProperty: computed({
        get() {
            return null;
        },
        set(key, validateProperty) {
            this.verifyPresence(validateProperty, VALIDATEPROP_MSG);
            return validateProperty;
        },
    }),

    changeset: computed({
        get() {
            return null;
        },
        set(key, changeset) {
            this.verifyPresence(changeset, CHANGESET_MSG);
            return changeset;
        },
    }),

    didReceiveAttrs() {
        this._super(...arguments);
        let submitted = get(this, 'submitted');
        let focusedValue = submitted ? 2 : 0;
        this.set('focused', focusedValue);
    },

    validForm: computed('focused', `changeset.error`, function() {
        let focused = get(this, 'focused');
        if (focused <= 1) {
            return true;
        }
        let property = get(this, 'property');
        return !get(this, `changeset.error.${property}`);
    }),

    actions: {
        focus() {
            this.incrementProperty('focused');
            const property = get(this, 'property');
            const changeset = get(this, 'changeset');
            console.log('FOCUS')
            this.sendAction('validateProperty', changeset, property);
        },

        blur() {
            console.log('BLUR')
            this.incrementProperty('focused');
        },
    },
});
