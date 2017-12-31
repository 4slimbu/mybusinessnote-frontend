jQuery(document).ready(function ($) {
	$('.panel-faq').on('show.bs.collapse', function () {
        $(this).addClass('active');
    });
	$('.panel-faq').on('hide.bs.collapse', function () {
        $(this).removeClass('active');
    });

    $('.panel-heading a').on('click',function(e){
        if($(this).parents('.panel').children('.panel-collapse').hasClass('in')){
            e.stopPropagation();
        }
    });
});

(function($){
        $(window).on("load",function(){
            $(".content").mCustomScrollbar();
        });
})(jQuery);


