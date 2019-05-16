var tbody = $('tbody'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc);
	detail = $('#detail').html(),
	detailGenerator = Handlebars.compile(detail);
//JSON 형식의 데이터 목록 가져오기
function loadList(pn) {

  $.getJSON('../../app/json/riw/list', 
      function(obj) {
    pageNo = obj.pageNo;
    tbody.html('');
    $(trGenerator(obj)).appendTo(tbody);
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
  }); // Bitcamp.getJSON()

} // loadList()

//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList(1);

//테이블 목록 가져오기를 완료했으면 제목 a 태그에 클릭 리스너를 등록한다. 
$(document.body).bind('loaded-list', () => {
  // 제목을 클릭했을 때 view.html로 전환시키기
  $('.bit-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
    $(e.target).attr('data-no');
  });
});

$('body').on('loaded-list', function() {
	$('.heun-detail').on('click', function(e) {
		$(this).off();
		var no = $(this).find('input').val();
		var appendTag = $(this).find('.heun-detail-child');
		$.getJSON('../../app/json/riw/detail?no=' + no, function(obj) {
	      appendTag.html('');
	      $(detailGenerator(obj)).appendTo(appendTag);
	      $(document.body).trigger('loaded-delete');
	      $(document.body).trigger('loaded-update');
	    }); // Bitcamp.getJSON()
	})
})

$('body').on('loaded-delete', function() {
	var no = $('.delete').attr('data-no');
  $('.delete').on('click', function() {
	console.log('dd');
		$.getJSON({
			url: '../../app/json/riw/delete?no=' + no,
			success: function(response) {
				location.href = 'index.html';
			},
			fail: function(error) {
				alert('변경 실패!!');
			}

		});
});
})

$('body').on('loaded-update', function() {
  $('.update').on('click', function(e) {
	  var no = $(e.target).attr('data-no');
		$.post({
			url: '../../app/json/riw/update',
				data:{
					no:no,
					contents:$('#update-' + $(e.target).attr('data-no')).val()
					
				},
			success: function(response) {
				location.href = 'index.html';
			},
			fail: function(error) {
				alert('변경 실패!!');
			}
		});
});
})

















