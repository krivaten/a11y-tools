import Ember from 'ember';

const {
    Component,
    get,
    guidFor,
    computed
} = Ember;

export default Component.extend({
    classNames: [
        'ui-checkbox-input',
        'p-y(2)'
    ],

    disabled: false,
    checked: false,
    description: null,
    label: null,
    name: null,

    guid: computed(function() {
        return guidFor(this);
    }),

    inputId: computed('guid', function() {
        const guid = get(this, 'guid');
        return `${guid}-input`;
    }),

    descriptionId: computed('guid', function() {
        const guid = get(this, 'guid');
        return `${guid}-description`;
    }),

    actions: {
        change(event) {
            const checked = event.target.checked;
            this.sendAction('update', checked, event);
        }
    }
});
