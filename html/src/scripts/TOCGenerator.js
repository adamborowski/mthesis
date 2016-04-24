export default class TOCGenerator {
    constructor() {
        var data = {
            children: []
        };
        var chapterHeaders = $('body h1');
        chapterHeaders.each((i, elem)=> {
            var chapterHeader = $(elem);
            var chapter = i + 1;
            chapterHeader.attr('data-chapter', chapter);
            chapterHeader.attr('id', `toc:${chapter}`);
            chapterHeader.after(`<span>[test: ${chapter}]</span>`);

            var d_chapter = {
                chapter, text: chapterHeader.text(),
                id: chapterHeader.attr('id'),
                element: chapterHeader, children: []
            };
            data.children.push(d_chapter);

            var sectionHeaders = chapterHeader.nextUntil('h1', 'h2');
            sectionHeaders.each((i, elem)=> {
                var sectionHeader = $(elem);
                var section = i + 1;
                sectionHeader.attr('data-chapter', chapter);
                sectionHeader.attr('data-section', section);
                sectionHeader.attr('id', `toc:${chapter}.${section}`);
                sectionHeader.after(`<span>[test: chapter ${chapter} section ${section}]</span>`);

                var d_section = {
                    section,
                    text: sectionHeader.text(),
                    id: sectionHeader.attr('id'),
                    element: sectionHeader,
                    children: []
                };
                d_chapter.children.push(d_section);

                var subsectionHeaders = sectionHeader.nextUntil('h2', 'h3');
                subsectionHeaders.each((i, elem)=> {
                    var subsectionHeader = $(elem);
                    var subsection = i + 1;
                    subsectionHeader.attr('data-chapter', chapter);
                    subsectionHeader.attr('data-section', section);
                    subsectionHeader.attr('data-subsection', subsection);
                    subsectionHeader.attr('id', `toc:${chapter}.${section}.${subsection}`);
                    subsectionHeader.after(`<span>[test: chapter ${chapter} section ${section} subsection ${subsection}]</span>`);

                    var d_subsection = {
                        subsection,
                        text: subsectionHeader.text(),
                        id: subsectionHeader.attr('id'),
                        element: subsectionHeader
                    };
                    d_section.children.push(d_subsection);

                });
            });
        });

        var tocElement = $('#table-of-contents');
        var output = Mustache.render(tocElement.html(), data);
        tocElement.html(output);
    }
}