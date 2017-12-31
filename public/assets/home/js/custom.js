$(document).ready(function(){
  $("#banner").owlCarousel({
  items : 1,
  loop : true,
  rewind : true,
  autoplay : true,
  });
  $("#testimonial").owlCarousel({
  items : 1,
  nav: true,
  loop : true,
  rewind : true,
  autoplay : true,
  navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>']
  });
});
$("a.account-sec").click(function(){
        $(".sign-in-form").toggle();
}); 
$("i.close").click(function(){
        $(".sign-in-form").toggle();
}); 



