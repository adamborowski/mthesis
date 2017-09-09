export default class FigureReference {
    constructor() {
        $('figure').each((i, block)=> {
            var $block = $(block);
            var id = $block.attr('id');
            var type = $block.attr('type');
            if (type != null) {
                $(`a[href^="#${id}"]`).addClass('ref-to-' + type);
            }
            else{
                console.error('figur of id not found: '+id)
                process.exit(999)
            }
        });

        $('figure[type=picture] figcaption').each((i, block)=> {
            var e = $(block);
            e.appendTo(e.parent());
        })
    }
}