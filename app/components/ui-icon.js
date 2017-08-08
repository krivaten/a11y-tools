import Em from 'ember';

const {
    Component,
    get,
    computed,
    String: {
        loc,
    },
} = Em;

const UiIcon = Component.extend({
    tagName: 'span',
    classNames: ['oi'],
    classNameBindings: [
        'print::noPrint',
    ],
    attributeBindings: [
        'testId:test-id',
        '_dataGlyph:data-glyph',
        '_hidden:aria-hidden',
        '_ariaLabel:aria-label',
    ],

    testId: null,
    hidden: true,
    ariaLabel: null,
    print: true,

    _hidden: computed('hidden', function() {
        return get(this, 'hidden') !== false ? true : undefined;
    }),

    _ariaLabel: computed('ariaLabel', function() {
        const ariaLabel = get(this, 'ariaLabel');

        return ariaLabel ? loc(ariaLabel) : null;
    }),

    _dataGlyph: computed('icon', function() {
        const icon = get(this, 'icon');

        return icon;
    }),
});

UiIcon.reopenClass({
    positionalParams: ['icon'],
});

export default UiIcon;
