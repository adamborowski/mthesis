import TOCGenerator from './TOCGenerator';
import hljs from 'highlight.js/lib/index'
new TOCGenerator();
$(window).on('load', ()=> {
    console.log('what??s');
    // $('h1').html('hacked piąteczek czwarcupksasd');

    $('figure.code code').each((i, block)=> {
        block.innerHTML = block.innerHTML.trim();
        hljs.highlightBlock(block);
    });


    $('a').each((i, block)=> {
        var $block = $(block);
        var selector = `figure${$block.attr('href').replace(":", "\\:")}`; // find element of id pointed by #href
        var figure = $(selector);
        if (figure.length) {
            var caption = figure.find('figcaption');
            console.log("Hello ", window.getComputedStyle(caption[0], '::before').cssText);
            // var name = window.getComputedStyle(document.querySelector(selector), "before").content;
            // $block.html(name);
            $block.text(figure.html());
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