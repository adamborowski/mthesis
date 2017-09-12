
export default class TOCGenerator {
    constructor() {
        var data = {
            children: []
        };
        var counter = 0;
        var chapterHeaders = $('body h1:not(.toc-ignore)');
        chapterHeaders.each((i, elem)=> {
            var e = $(elem);
            var numbered = !e.hasClass('toc-not-numbered');
            if (numbered) {
                counter++;
            }
            this.processChapter(e, data.children, numbered ? counter : "not-numbered-" + i);
        });

        var tocElement = $('#table-of-contents');
        var output = Mustache.render($('#template-toc').text(), data);
        tocElement.html(output);
        this.processChapterReferences();
    }

    processChapterReferences() {
        $(`.body a[href^="#chapter:"]`).each((i, block)=> {
            var $block = $(block);
            var headerSelector = $block.attr('href').replace(':', '\\:');
            var header = $(headerSelector);
            var address = header.attr('data-chapter-address');
            if(address){
                var value = address.substr(0, address.length - 1);
                $block.text($block.text() + ' ' + value);
            }
            else {
                $block.text('{missed reference}');
            }
        });
    }

    makeAddress(chapter, section = null, subsection = null) {
        var a = chapter + ".";
        if (section != null) {
            a += section + ".";
        }
        if (subsection != null) {
            a += subsection + ".";
        }
        return a;
    }

    makeId(element) {
        var address = this.makeAddress(element.attr('data-chapter'), element.attr('data-section'), element.attr('data-subsection'));
        if (element.attr('id') == null) {
            element.attr('id', "toc:" + address);
        }
        element.attr('data-chapter-address', address);
        // element.after(`<span>[test: ${element.attr('id')}]</span>`);
    }

    processChapter(header, children, chapter) {
        header.attr('data-chapter', chapter);
        this.makeId(header);
        var d_chapter = {
            chapter, text: header.text(),
            id: header.attr('id'),
            address: this.makeAddress(chapter),
            element: header, children: [],
            notNumbered: header.hasClass('toc-not-numbered')
        };
        children.push(d_chapter);

        var sectionHeaders = header.nextUntil('h1', 'h2');
        sectionHeaders.each((i, elem)=> {
            this.processSection($(elem), d_chapter.children, chapter, i + 1);
        });
    }

    processSection(header, children, chapter, section) {
        header.attr('data-chapter', chapter);
        header.attr('data-section', section);
        this.makeId(header);

        var d_section = {
            section,
            text: header.text(),
            id: header.attr('id'),
            address: this.makeAddress(chapter, section),
            element: header,
            children: []
        };
        children.push(d_section);

        var subsectionHeaders = header.nextUntil('h2', 'h3');
        subsectionHeaders.each((i, elem)=> {
            this.processSubsection($(elem), d_section.children, chapter, section, i + 1);
        });
    }

    processSubsection(header, children, chapter, section, subsection) {
        header.attr('data-chapter', chapter);
        header.attr('data-section', section);
        header.attr('data-subsection', subsection);
        this.makeId(header);

        var d_subsection = {
            subsection,
            text: header.text(),
            id: header.attr('id'),
            address: this.makeAddress(chapter, section, subsection),
            element: header
        };
        children.push(d_subsection);
    }
}