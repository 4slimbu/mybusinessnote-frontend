jQuery(document).ready(function ($) {
	$(".progress-bar").loading();
	$('.panel-faq').on('show.bs.collapse', function () {
        $(this).addClass('active');
    });
	$('.panel-faq').on('hide.bs.collapse', function () {
        $(this).removeClass('active');
    });
});

(function($){
        $(window).on("load",function(){
            $(".content").mCustomScrollbar();
        });
})(jQuery);


