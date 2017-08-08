import Ember from 'ember';
import UiInput from 'ally/components/ui-input';
import createTextMaskInputElement from 'ember-text-mask/createTextMaskInputElement';

const {
    computed,
    get,
    getProperties,
} = Ember;

const MASK_PROPS = ['mask', 'guide', 'placeholderChar', 'keepCharPositions', 'pipe', 'showMask'];

const UiInputComponent = UiInput.extend({
    classNames: ['ui-postal-input'],
    type: 'tel',
    placeholder: '00000',

    mask(value) {
        const length = value.length;

        if (length <= 5) {
            return [/\d/, /\d/, /\d/, /\d/, /\d/];
        } else {
            return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        }
    },

    guide: false,
    placeholderChar: '_',
    keepCharPositions: false,
    pipe: false,
    showMask: true,

    textMaskInputElement: computed(...MASK_PROPS, function() {
        let config = getProperties(this, ...MASK_PROPS);
        config.inputElement = this.element;
        return createTextMaskInputElement(config);
    }),

    _processNewValue(value, event) {
        get(this, 'textMaskInputElement').update(value);
        value = this.readDOMAttr('value');

        if (this._value !== value) {
            this._value = value;
            this.sendAction('update', value, event);
        }
    },
});

export default UiInputComponent;
