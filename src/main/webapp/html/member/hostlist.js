var form = $('.item-listing'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    rating = 0;

$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
  loadList();
})

function loadList() {
  $.getJSON('../../app/json/member/profile',
			function(obj) {
		if (obj.photo != null) {
		$("<img>").attr('src',
				'/heunheuntrip/html/memberprofileupload/' + obj.photo)
				.css('width', '255px')
				.appendTo($('#profileimg'));
		} else {
		$("<img>").attr('src',
					'/heunheuntrip/html/memberupload/defualt.jpeg')
					.css('width', '255px')
					.appendTo($('#profileimg'));
		}
		//	$(--------).appendTo(-------);
		// 세션에서 로그인 사용자 정보를 가지고와서 뿌리자~ 
	}); // Bitcamp.getJSON(
    $(document.body).trigger('loaded-list');
} // loadList()

$(document.body).bind('loaded-list', (e) => {
  
});



