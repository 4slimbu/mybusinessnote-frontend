jQuery(document).ready(function ($) {
	$(".progress-bar").loading();
	$('.panel-faq').on('show.bs.collapse', function () {
        $(this).addClass('active');
    });
	$('.panel-faq').on('hide.bs.collapse', function () {
        $(this).removeClass('active');
    });
    $(document).mouseup(function(e)
    {
        let container = $(".mobile-navbar");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            if (!$(".navbar-toggle").hasClass('collapsed')) {
                $(".mobile-navbar .navbar-toggle").click();
            }
        }
    });
});

(function($){
        $(window).on("load",function(){
            $(".content").mCustomScrollbar();
        });
})(jQuery);


