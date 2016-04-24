import TOCGenerator from './TOCGenerator';
//TODO import in production
// import hljs from 'highlight.js/lib/index'
$(window).on('load', ()=> {
    new TOCGenerator();
    // $('h1').html('hacked piąteczek czwarcupksasd');

    //TODO enable in production
    // $('figure[type="code"] code').each((i, block)=> {
    //     block.innerHTML = block.innerHTML.trim();
    //     hljs.highlightBlock(block);
    // });

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


    $('figure').each((i, block)=> {
        var $block = $(block);
        var id = $block.attr('id');
        var type = $block.attr('type');
        if (type != null) {
            $(`a[href^="#${id}"]`).addClass('ref-to-' + type);
        }
    });
});

function rightCaption(chapter, section, subsection, chapterString, sectionString, subsectionString) {
    var caption = chapterString;
    var label = "Rozdział";
    var version = chapter + ".";
    if (section > 0) {
        caption = sectionString;
        label = "Podrozdział ";
        version += section + ".";
    }
    if (subsection > 0) {
        caption = subsectionString;
        label = "Podrozdział ";
        version += subsection + ".";
    }

    return `${label} ${version} ${caption}`;
}

Prince.addScriptFunc("book-right-caption", rightCaption);