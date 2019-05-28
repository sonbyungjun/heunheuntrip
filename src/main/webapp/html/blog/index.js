var form = $('.blog-form-list'),
templateSrc = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSrc);


//header, footer 가져오기
$(document).ready(function () {
	$('#heun-header').load('../header.html', function () {
		$('.heun-header-nav').removeClass('navbar-over absolute-top');
	});

	$('#heun-footer').load('../footer.html', function () {
	});
})


function loadList() {
    $('.blog-form-list').css("width", "1150px");
	$('.blog-form-list').css("height", "600px");
	
	$('.blog-form-list').css("overflow", "hidden");
	$.ajax({ 
		url: '../../app/json/blog/list',
		type: 'GET',
		dataType: 'json',
		success: function (response) {

			$(trGenerator(response)).appendTo(form);

			// ig.prepend($(trGenerator(response))).appendTo(form);

			$(document.body).trigger('loaded-list');

		},
		fail: function (error) {
			alert('시스템 오류가 발생했습니다.');
		}
	});
	
	
	
} // loadList()


//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList();

$(document.body).bind('loaded-list', () => {

	$('.bit-view-link').on('click', function (e) {
		e.preventDefault();
		console.log(e.target);
		 window.location.href = 'view.html?no=' + $(e.target).attr('data-no');
	})

	$('.check-btn').on('click', function (e) {
		e.preventDefault();
		$.ajax({
			url: '../../app/json/blog/checkUser',
			type: 'GET',
			dataType: 'json',
			success: function (response) {
				if (response.status == 'success') {

					location.href = 'add.html';
				} else {
					alert('체크아웃 목록이 없어 블로그를 작성할 수 없습니다.');
				}
			},
			fail: function (error) {
				alert('시스템 오류가 발생했습니다.');
			}
		});
	});
});





$('.heun-search > a').on('click', function() {

	$('.searchselect').html($(this).html());

	$('.search-btn').on('click', function(e){

		e.preventDefault();



		if($('.searchselect').html() == "최신글") {
			console.log($('.searchselect').html());
			$.ajax({
				url: '../../app/json/blog/order',
				type: 'GET',
				dataType: 'json',
				success: function (response) {
				
					form.html('');

					$(trGenerator(response)).appendTo(form);
					$(document.body).trigger('loaded-list');

				},
				fail: function (error) {
					alert('시스템 오류가 발생했습니다.');
				}
			});
		} else {
				$.ajax({
				url: '../../app/json/blog/gradeorder',
				type: 'GET',
				dataType: 'json',
				success: function (response) {
					
					form.html('');

					$(trGenerator(response)).appendTo(form);
					$(document.body).trigger('loaded-list');

				},
				fail: function (error) {
					alert('시스템 오류가 발생했습니다.');
				}
			});

		}

	});

})
