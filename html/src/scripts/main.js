$(window).on('load', ()=> {

    // $('.card').each((id, elem)=> {
    //     let e = $(elem);
    //     e.clone().appendTo(e.parent());
    // });

    $('[data-from]').each((id, elem) => {
        let $el = $(elem);
        $el.html(`since ${$el.attr('data-from').replace('-', '/')}`);
    });
    $('[data-to]').each((id, elem) => {
        let $el = $(elem);
        $el.html($el.attr('data-to').replace('-', '/'));
    });
    $('[data-to][data-from]').each((id, elem) => {
        let $el = $(elem);
        $el.html(`${$el.attr('data-from').replace('-', '/')} &dash; ${$el.attr('data-to').replace('-', '/')}`);
    });

});
