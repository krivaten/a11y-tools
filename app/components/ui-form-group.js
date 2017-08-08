import Ember from 'ember';

const {
    Component,
    computed,
    get,
    guidFor,
    assert,
    isPresent,
} = Ember;

const LABEL_MSG = 'You must include a "label" attribute in all uses of "{{ui-form-group}}" for disabled users. If you want to hide the label visually, you may also provide the attribute "labelVisible=false".';

export default Component.extend({
    classNames: [
        'ui-form-group',
        'm-y(3)'
    ],
    labelVisible: true,
    testId: 'uiFormGroup',
    attributeBindings: ['testId:test-id', 'role'],

    verifyPresence: (value, message) => assert(message, isPresent(value)),

    label: computed({
        get() {
            this.verifyPresence(null, LABEL_MSG);
            return null;
        },
        set(key, label) {
            this.verifyPresence(label, LABEL_MSG);
            return label;
        },
    }),

    uuid: computed(function() {
        return guidFor(this);
    }),

    inputId: computed(function() {
        const guid = get(this, 'uuid');
        return `${guid}-input`;
    }),

    descriptionId: computed(function() {
        const uuid = get(this, 'uuid');
        return `${uuid}-description`;
    }),
});
