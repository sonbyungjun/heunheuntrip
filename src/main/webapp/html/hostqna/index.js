var thead = $('thead'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc);

//JSON 형식의 데이터 목록 가져오기
function loadList(pn) {

  $.getJSON('../../app/json/hostqna/list', 
      function(obj) {
    pageNo = obj.pageNo;
    thead.html('');
    $('.add').hide();
    $(trGenerator(obj)).appendTo(thead);
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
	$('.hostqna').on('click', function(e) {
		$(this).off();
		
		$('.add').show();
		$(document.body).trigger('loaded-add');
	})
})

$('body').on('loaded-add', function() {
	$('.add').on('click', function(e) {
    var content = $('#content').val();
		$.post({
			url: '../../app/json/hostqna/add',
			data:{
				userNo:1,
				roomNo:1,
				content:content
			},
		success: function(response) {
			location.href = 'index.html';
		},
		fail: function(error) {
			alert('변경 실패!!');
		}
	
		
	    }); // Bitcamp.getJSON()
	})
})
//$('body').on('loaded-delete', function() {
//	var no = $('.delete').attr('data-no');
//  $('.delete').on('click', function() {
//	console.log('dd');
//		$.getJSON({
//			url: '../../app/json/riw/delete?no=' + no,
//			success: function(response) {
//				location.href = 'index.html';
//			},
//			fail: function(error) {
//				alert('변경 실패!!');
//			}
//
//		});
//});
//})
//
//$('body').on('loaded-update', function() {
//  $('.update').on('click', function(e) {
//	  var no = $(e.target).attr('data-no');
//		$.post({
//			url: '../../app/json/riw/update',
//				data:{
//					no:no,
//					contents:$('#update-' + $(e.target).attr('data-no')).val()
//					
//				},
//			success: function(response) {
//				location.href = 'index.html';
//			},
//			fail: function(error) {
//				alert('변경 실패!!');
//			}
//		});
//});
//})

















