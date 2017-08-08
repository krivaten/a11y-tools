import UiCheckboxInput from 'ally/components/ui-checkbox-input';
import Ember from 'ember';


const {
    computed
} = Ember;

export default UiCheckboxInput.extend({
    classNames: [
        'ui-radio-input'
    ],

    displayLabel: computed.or('label', 'value'),

    actions: {
        change(event) {
            const value = event.target.value;
            this.sendAction('update', value, event);
        }
    }
});
