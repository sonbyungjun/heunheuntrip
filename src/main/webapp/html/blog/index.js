var form = $('.blog-form-list'),
templateSrc = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSrc),
i = 1,
pageNo = 0,
totalPage = 0;

//header, footer 가져오기
$(document).ready(function () {
	$('#heun-header').load('../header.html', function () {
		$('.heun-header-nav').removeClass('navbar-over absolute-top');
	});

	$('#heun-footer').load('../footer.html', function () {
	});
})


var timer;





function loadList(pn) {   
   
   $.getJSON('../../app/json/blog/list?pageNo=' + pn,
        function(obj) {
  
      pageNo = obj.pageNo;
      totalPage = obj.totalPage
     
      obj.pagination = {
          page: obj.pageNo,
          pageCount: obj.totalPage
      };
  
      $(trGenerator(obj)).appendTo(form);

      ++window.i;
      
      $(document.body).trigger('loaded-list');
      
		
  
    }); // Bitcamp.getJSON(
  
  } // loadList()


	

//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList(window.i);


$(document).scroll(function(event){
   
	
//    let scrollTop = $(window).scrollTop();
//    let windowHeight = $(window).height();
//    let documentHeight = $(document).height();
	  var maxHeight = $(document).height();
	  var currentScroll = $(window).scrollTop() + $(window).height();
    
    
    // scrollbar의 thumb가 바닥 전 30px까지 도달 하면 리스트를 가져온다.
    if( maxHeight <= currentScroll + 20 ){
    	    	
    	
    	if (totalPage <= pageNo) {
    	return;	
    	}
   
    	
    		console.log(window.i);
    		loadList(window.i);
   
    }
})


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

		form.html('');
		
		


		if($('.searchselect').html() == "최신순") {
			console.log($('.searchselect').html());
			$.ajax({
				url: '../../app/json/blog/order',
				type: 'GET',
				dataType: 'json',
				success: function (response) {

					form.html('');

					$(trGenerator(response)).appendTo(form);
					$(document.body).trigger('loaded-list');
					return;
				},
				fail: function (error) {
					alert('시스템 오류가 발생했습니다.');
				}
			});
		} 
		
		if($('.searchselect').html() == "평점순") {
			console.log($('.searchselect').html());
			$.ajax({
				url: '../../app/json/blog/gradeorder',
				type: 'GET',
				dataType: 'json',
				success: function (response) {

					form.html('');

					$(trGenerator(response)).appendTo(form);
					$(document.body).trigger('loaded-list');
					return;

				},
				fail: function (error) {
					alert('시스템 오류가 발생했습니다.');
				}
			});

		}
		
		if($('.searchselect').html() == "오래된순") {
			console.log($('.searchselect').html());
			$.ajax({
				url: '../../app/json/blog/deorder',
				type: 'GET',
				dataType: 'json',
				success: function (response) {

					form.html('');

					$(trGenerator(response)).appendTo(form);
					$(document.body).trigger('loaded-list');
					return;
				},
				fail: function (error) {
					alert('시스템 오류가 발생했습니다.');
				}
			});

		}

	});

})
