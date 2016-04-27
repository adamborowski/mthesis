$(window).on('load', ()=> {

    $('.card').each((id, elem)=> {
        let e = $(elem);
        e.clone().appendTo(e.parent());
    });

});
