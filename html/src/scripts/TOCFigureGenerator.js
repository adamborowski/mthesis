export default class TOCFigureGenerator {
    constructor($targetElement, type) {
        var myFigures = $(`figure[type="${type}"]`);
        var items = [];
        myFigures.each((i, block)=> {
            var e = $(block);
            if (e.attr('id') == null) {
                e.attr('id', `toc-${type}-${i}`);
            }
            items.push({
                text: e.find('figcaption').text(),
                id: e.attr('id')
            });

        });
        var output = Mustache.render($('#template-toc-figure').text(), {
            children: items,
            type: type
        });
        $targetElement.html(output);
    }
}