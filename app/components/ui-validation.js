import Ember from 'ember';
import layout from '../templates/components/ui-validation';

const {
    get,
    assert,
    computed,
    isPresent,
    Component,
} = Ember;

const ID_MSG = 'You must include a "id" attribute in all uses of "{{ui-validation}}".';
const FOCUSED_MSG = 'You must include a "focused" attribute in all uses of "{{ui-validation}}".';
const PROPERTY_MSG = 'You must include a "property" attribute in all uses of "{{ui-validation}}".';
const CHANGESET_MSG = 'You must include a "changeset" attribute in all uses of "{{ui-validation}}".';

export default Component.extend({
    layout,

    verifyPresence: (value, message) => assert(message, isPresent(value)),

    init() {
        this._super(...arguments);
        let property = get(this, 'property');
        this.verifyPresence(property, PROPERTY_MSG);
        let id = get(this, 'id');
        this.verifyPresence(id, ID_MSG);
        let focused = get(this, 'focused');
        this.verifyPresence(focused, FOCUSED_MSG);
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

    id: computed({
        get() {
            return null;
        },
        set(key, id) {
            this.verifyPresence(id, ID_MSG);
            return id;
        },
    }),

    focused: computed({
        get() {
            return null;
        },
        set(key, focused) {
            this.verifyPresence(focused, FOCUSED_MSG);
            return focused;
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
});
