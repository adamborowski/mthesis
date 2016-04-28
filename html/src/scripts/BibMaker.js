export default class BibMaker {
    constructor() {
        var refs = [];
        var bibs = [];
        var bibCounter = 0;

        $(`a[href^="#bib:"]`).each((i, block)=> {
            var $block = $(block);
            var href = $block.attr('href').replace(":", "\\:");
            var $bib = $(`citation${href}`);
            refs.push({
                ref: $block, bib: $bib
            });
            if ($bib.attr('data-bib-order') == null) {
                bibCounter++;
                $bib.attr('data-bib-order', bibCounter);
            }
            bibs.push($bib);
        });

        refs.forEach((ref)=> {
            ref.ref.text(`[${ref.bib.attr('data-bib-order')}]`);
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