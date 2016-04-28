export default class TOCFigureGenerator {
    constructor($targetElement, type) {
        var myFigures = $(`figure[type="${type}"]`);
        console.log(myFigures.length);
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
        var output = Mustache.render($targetElement.html(), {
            children: items,
            type: type
        });
        $targetElement.html(output);
    }
}