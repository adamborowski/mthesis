export default class LanguageDecorator {
    constructor() {
        $('trans').each((i, $elem)=> {
            this.decorateLanguage($elem);
        });
    }

    decorateLanguage($elem) {
        $elem = $($elem);
        var lang = $elem.attr('lang');
        var content = $elem.text();
        $elem.html(`<span class="lang">(${lang}. </span><span class="content">${content}</span><span class="right-brace">)</span>`);
    }
}