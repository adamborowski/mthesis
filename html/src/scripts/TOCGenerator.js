export default class TOCGenerator {
    constructor() {
        var data = {
            children: []
        };
        var chapterHeaders = $('body h1');
        chapterHeaders.each((i, elem)=> {
            this.processChapter($(elem), data.children, i + 1);
        });

        var tocElement = $('#table-of-contents');
        var output = Mustache.render(tocElement.html(), data);
        tocElement.html(output);
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
        // if (element.attr('id') == null) {
        element.attr('id', "toc:" + this.makeAddress(element.attr('data-chapter'), element.attr('data-section'), element.attr('data-subsection')));
        // }
        element.after(`<span>[test: ${element.attr('id')}]</span>`);
    }

    processChapter(header, children, chapter) {
        header.attr('data-chapter', chapter);
        this.makeId(header);
        var d_chapter = {
            chapter, text: header.text(),
            id: header.attr('id'),
            address: this.makeAddress(chapter),
            element: header, children: []
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