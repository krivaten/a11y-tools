import Ember from 'ember';

const {
    Component,
    computed,
    get,
    assert,
    isPresent,
} = Ember;

const ALLOWED_TYPES = ['text', 'search', 'tel', 'password', 'number', 'email'];

const UiInputComponent = Component.extend({
    id: null,
    ariaDescribedBy: null,
    update: null,
    testId: 'fldInput',
    _value: undefined,

    tagName: 'input',
    classNames: [
        'ui-input',
        'd(b)',
        'w(100%)',
        'p(2)',
        'bdrad(2)',
        'bd(1)',
        'bdc(gray)'
    ],

    attributeBindings: [
        'type',
        'locPlaceholder:placeholder',
        'testId:test-id',
        'value',
        'ariaDescribedBy:aria-describedby',
    ],

    locPlaceholder: computed('placeholder', function() {
        let placeholder = get(this, 'placeholder');
        if (!placeholder) {
            return;
        }
        let loc = Ember.String.loc(placeholder);
        return loc ? loc : placeholder;
    }),

    type: computed({
        get() {
            return 'text';
        },

        set(key, type) {
            assert(`The {{ui-input}} component does not support type="${type}".`, ALLOWED_TYPES.indexOf(type) !== -1);
            return type;
        },
    }),

    change(event) {
        let value = this.readDOMAttr('value');
        this._processNewValue(value, event);
    },

    input(event) {
        let value = this.readDOMAttr('value');
        this._processNewValue(value, event);
    },

    _processNewValue(value, event) {
        if (this._value !== value) {
            this._value = value;
            this.sendAction('update', value, event);
        }
    },
});

export default UiInputComponent;
