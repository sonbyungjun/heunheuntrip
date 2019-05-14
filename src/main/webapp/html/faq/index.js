var tbody = $('tbody'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    detail = $('#detail').html(),
    detailGenerator = Handlebars.compile(detail);

// JSON 형식의 데이터 목록 가져오기
function loadList(pn) {

  $.getJSON('../../app/json/faq/list', 
    function(obj) {
      tbody.html(''); 
      $(trGenerator(obj)).appendTo(tbody);
      
      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
      $(document.body).trigger('loaded-list');
      
    }); // Bitcamp.getJSON()
  
} // loadList()

$('#delete-btn').on('click', function() {
	$("input[name=aa]:checked").each(function(i) {
		$.getJSON({
			url: '../../app/json/faq/delete?no=' + $(this).val(),
			success: function(response) {
				location.href = 'index.html';
			},
			fail: function(error) {
				alert('변경 실패!!');
			}
		});
	})
})


$('#update-btn').on('click', function() {
		$.post({
			url: '../../app/json/faq/update',
			data:{
				no:$('#content').attr('data-no'),
				content:$('#content').val()
		
			},
			success: function(response) {
				location.href = 'index.html';
			},
			fail: function(error) {
				alert('변경 실패!!');
			}
		});
	})

$('body').on('loaded-list', function() {
	$('.heun-detail').on('click', function(e) {
		$(this).off();
		var no = $(this).find('input').val();
		var appendTag = $(this).find('.heun-detail-child');
		$.getJSON('../../app/json/faq/detail?no=' + no, function(obj) {
	      appendTag.html('');
	      $(detailGenerator(obj)).appendTo(appendTag);
//			tbody.html(''); 
//			$(detailGenerator(obj)).appendTo(tbody);
//				      
//	      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
//	      $(document.body).trigger('loaded-list');
				      
	    }); // Bitcamp.getJSON()
		
		
	})

})
//$('#update-btn').on('click',function(){
//	console.log($('#no').val());
//  $.ajax({
//    url: '../../app/json/qna/update,
//    type: 'POST',
//    data: {
//      no: $('#no').val(),      
//      content: $('#content').val()
//        },
//    dataType: 'json',
//    success: function(response) {
//      location.href = 'index.html';
//    },
//    fail: function(error) {
//      alert('변경 실패!!');
//    }
//  });
//}
//)






//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList(1);












