export default class BibMaker {
    constructor() {
        var refs = [];
        var bibs = [];
        var bibCounter = 0;

        $(`a[href^="#bib:"]`).each((i, block)=> {
            var $block = $(block);
            var href = $block.attr('href').replace(":", "\\:");
            var chapter = $block.attr('chapter');
            var $bib = $(`citation${href}`);
            refs.push({
                ref: $block, bib: $bib, chapter: chapter
            });
            if ($bib.attr('data-bib-order') == null) {
                bibCounter++;
                $bib.attr('data-bib-order', bibCounter);
            }
            bibs.push($bib);
        });

        refs.forEach((ref)=> {
            var bibOrder = ref.bib.attr('data-bib-order');
            var chapter = ref.chapter;
            if (chapter == null) {
                ref.ref.text(`[${bibOrder}]`);
            }
            else {
                ref.ref.text(`[${bibOrder}; ${chapter}]`);
            }
        });

        $('citations citation').sort(function (a, b) {
            var contentA = parseInt($(a).attr('data-bib-order')) || Infinity;
            var contentB = parseInt($(b).attr('data-bib-order')) || Infinity;
            return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
        }).prependTo($('citations'));

        $('citations citation').each((i, element)=> {
            var e = $(element);
            e.find('author').appendTo(e);
            e.find('title').appendTo(e);
            e.find('publisher').appendTo(e);
            e.find('journal').appendTo(e);
            e.find('year').appendTo(e);

            var url = e.find('url');
            if (url.length) {
                url.appendTo(e);
                url.wrapInner("<a/>")
                var a = url.find('a');
                a.attr('href', url.text());
                if (url.attr('access') != null) {
                    url.append(`<date>${url.attr('access')}</date>`);
                }
            }

        });
    }
}