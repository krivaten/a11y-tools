import Em from 'ember';
import hbs from 'htmlbars-inline-precompile';
import AriaTools from 'q2-ui-core/mixins/aria-tools';

const {
    Component,
    get,
    computed,
    String: {
        loc,
    },
} = Em;

const UiBtn = Component.extend(AriaTools, {
    tagName: 'button',
    layout: hbs('{{#if hasBlock}}{{yield}}{{else}}{{_content}}{{/if}}'),
    classNameBindings: [
        'print::noPrint',
        'disabled:disabled',
        'btnStyle:btn:ui-btn',
        '_btnStyleClass',
        '_btnSizeClass',
        '_tooltipClasses',
    ],
    attributeBindings: [
        'type',
        'disabled',
        'tabIndex:tabindex',
        'testId:test-id',
    ],

    print: true,
    disabled: false,
    type: 'button',
    testId: null,
    btnStyle: null,
    size: null,
    tabIndex: null,
    content: null,
    tooltipDirection: 'sw',
    tooltipEnabled: true,

    _tooltipClasses: computed('ariaLabel', 'tooltipEnabled', 'tooltipDirection', function() {
        const tooltipEnabled = get(this, 'tooltipEnabled');
        const ariaLabel = get(this, 'ariaLabel');

        if (!tooltipEnabled || !ariaLabel) {
            return;
        }

        const tooltipDirection = get(this, 'tooltipDirection');

        return `tooltipped tooltipped-${tooltipDirection}`;
    }),

    _content: computed('content', function() {
        const content = get(this, 'content');

        return content ? loc(content) : null;
    }),

    _btnStyleClass: computed('btnStyle', function() {
        const btnStyle = get(this, 'btnStyle');

        return btnStyle && btnStyle !== 'btn' ? `btn-${btnStyle}` : null;
    }),

    _btnSizeClass: computed('size', function() {
        const size = get(this, 'size');

        return size ? `btn-${size}` : null;
    }),
});

UiBtn.reopenClass({
    positionalParams: ['btnStyle'],
});

export default UiBtn;
