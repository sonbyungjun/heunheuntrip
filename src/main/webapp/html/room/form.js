$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");

  $('#fullpage').fullpage({
    //options here
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling:false,
    navigationPosition: 'right',
    scrollHorizontally: false,
    loopHorizontal: false
	});

});

$('.heun-form-next').click(function() {
  fullpage_api.moveSlideRight();
})