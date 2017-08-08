import Em from 'ember';
import hbs from 'htmlbars-inline-precompile';
import AriaTools from 'q2-ui-core/mixins/aria-tools';

const {
    Component,
    computed,
    String: {
        loc,
        htmlSafe,
    },
} = Em;

export default Component.extend(AriaTools, {
    tagName: 'a',
    layout: hbs('{{#if hasBlock}}{{yield}}{{else}}{{_content}}{{/if}}'),
    classNameBindings: [
        'print::noPrint',
        'disabled:disabled',
    ],
    attributeBindings: [
        'testId:test-id',
        '_href:href',
        '_title:title',
    ],

    print: true,
    disabled: false,
    testId: null,
    titleLoc: null,
    content: null,

    href: 'javascript://', //eslint-disable-line no-script-url

    _href: computed('href', function() {
        const href = this.get('href');
        return href ? htmlSafe(href) : null;
    }),

    _titleLoc: computed('titleLoc', function() {
        const titleLoc = this.get('titleLoc');
        return titleLoc ? loc(titleLoc) : null;
    }),

    _content: computed('content', function() {
        const content = this.get('content');
        return content ? loc(content) : null;
    }),
});
