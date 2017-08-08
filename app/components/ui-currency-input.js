import Ember from 'ember';
import UiInput from 'ally/components/ui-input';
import createTextMaskInputElement from 'ember-text-mask/createTextMaskInputElement';
import { createNumberMask  } from 'ember-text-mask-addons';

const {
    computed,
    get,
    getProperties
} = Ember;

const MASK_PROPS = ['guide', 'placeholderChar', 'keepCharPositions', 'pipe', 'showMask'];
const NUM_MASK_PROPS = ['prefix', 'suffix', 'includeThousandsSeparator', 'thousandsSeparatorSymbol', 'allowDecimal', 'decimalSymbol', 'decimalLimit', 'requireDecimal', 'allowNegative', 'integerLimit', 'allowLeadingZeroes'];

const UiInputComponent = UiInput.extend({
    classNames: [
        'ui-currency-input',
        'ta(r)'
    ],
    type: 'tel',

    // MASK SETUP
    // TODOS:
    // Paste Values
    // Max Length
    textMaskInputElement: computed(...MASK_PROPS, function() {
        let config = getProperties(this, ['prefix', ...MASK_PROPS]);
        config.mask = get(this, 'mask').bind(this);
        config.inputElement = this.element;
        return createTextMaskInputElement(config);
    }),

    mask: computed('value', ...NUM_MASK_PROPS, function() {
        const config = getProperties(this, ...NUM_MASK_PROPS);
        return createNumberMask(config);
    }),

    placeholder: '$0.00',
    guide: false,
    placeholderChar: '_',
    keepCharPositions: true,
    showMask: true,
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    integerLimit: 13,
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    requireDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: true,

    didInsertElement() {
        this._super(...arguments);

        let value = this.readDOMAttr('value');
        this._processNewValue(value);
        this.element.addEventListener('paste', (event) => this.onPaste(event), false);
    },

    onPaste(event) {
        event.stopPropagation();
        event.preventDefault();

        let value = event.clipboardData.getData('Text');
        value = value ? parseFloat(value).toFixed(2) : value;

        this._processNewValue(value);
    },

    _processNewValue(value='', event) {
        const selectionStart = this.element.selectionStart;
        let valueLength = value.length;
        let cleanValue = value ? (value.replace(/[^0-9]/g, '') * 0.01).toFixed(2) : '';

        get(this, 'textMaskInputElement').update(cleanValue);

        let updatedValue = this.readDOMAttr('value');
        let updatedValueLength = updatedValue.length;

        const shouldBeAtEnd = selectionStart === valueLength;
        if (shouldBeAtEnd) {
            this.element.setSelectionRange(updatedValueLength, updatedValueLength);
        } else {
            const newPosition = selectionStart + (updatedValueLength - valueLength);

            this.element.setSelectionRange(newPosition, newPosition)
        }

        if (this._value !== updatedValue) {
            this._value = updatedValue;
            this.sendAction('update', updatedValue, event);
        }
    },
});

export default UiInputComponent;
