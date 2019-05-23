$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
})

var tbody = $('.faq-form'),
  templateSrc = $('#tr-template').html(),
  trGenerator = Handlebars.compile(templateSrc),
  detail = $('#detail').html(),
  detailGenerator = Handlebars.compile(detail);

//JSON 형식의 데이터 목록 가져오기
function loadList(pn) {
  $.getJSON('../../app/json/faq/list',
    function (obj) {
      tbody.html('');
      $(trGenerator(obj)).appendTo(tbody);
      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
      $(document.body).trigger('loaded-list');
      $(document.body).trigger('loaded-add');
      $('.faq-list').find('div').css('display', 'none');
      $('.faq-view').find('div').css('display', 'none');
      $('.faq-add').find('div').css('display', 'none')
    }); // Bitcamp.getJSON()
} // loadList()
$('body').on('loaded-list', function () {
  $('.delete-btn').on('click', function (e) {
    var no = $(e.target).attr('data-no')
    console.log(no);
    $.getJSON({
      url: '../../app/json/faq/delete?no=' + no,
      success: function (response) {
        location.href = 'index.html';
      },
      fail: function (error) {
        alert('변경 실패!!');
      }
    });
  })
})

$('body').on('loaded-list', function () {
  $('.update-btn').on('click', function (e) {
    var no = $(this).attr('data-no')
    console.log(no);
    $.post({
      url: '../../app/json/faq/update',
      data: {
        no: no,
        content: $('#content-' + no).val()
      },
      success: function (response) {
        location.href = 'index.html';
      },
      fail: function (error) {
        alert('변경 실패!!');
      }
    });
  })
})

$('body').on('loaded-list', function () {
  $('.faq-list').on('click', function (e) {
    //1) ".faq-detail > div" 없으면 서버에서 가져온다..
    //2) ".faq-detail > div" 를 모두 감춘다.
    //3) 현재 이벤트가 발생한 객체의 div 만 보인다.
    // if($(this).css('display') == 'none'){
    //      $('.aa').find('div').css('display', '');
    // }else{
    // }
    if ($(this).parents('.faq-pa').find('.faq-view').find('div').css('display') == 'none') {
      //$(this).parents('.faq-pa').find('.faq-view').find('div').css('display', 'none')
      $('.faq-view').find('div').css('display', 'none');
      $(this).parents('.faq-pa').find('.faq-view').find('div').css('display', '')
      $('.faq-add').find('div').css('display', 'none')
    } else {
      $(this).parents('.faq-pa').find('.faq-view').find('div').css('display', 'none');
    }
  }); // Bitcamp.getJSON()
})

$('body').on('loaded-add', function () {
  $('#addview-btn').on('click', function () {
    $('.faq-view').find('div').css('display', 'none');
    $('.faq-add').find('div').css('display', '');
  })
})
$('#add-btn').on('click', function () {
  var text = $('textarea#content').val();
  console.log(text);
  $.ajax({
    url: '../../app/json/faq/add',
    type: 'POST',
    data: {
      title: $('#title').val(),
      content: text
    },
    dataType: 'json',
    success: function (response) {
      location.href = 'index.html';
    },
    fail: function (error) {
      alert('등록 실패!!');
    }
  });
})
loadList(1);

$('.btn-qna').on('click', function () {
  location.href = '../qna/index.html';
})

//if($(e.target).closest('div').find('div').css('display') == 'none'){
// 		$('.aa').find('div').css('display', 'none');
// 		$('.aa').find('div').css('display', '');
// 		$('.faq-add').find('div').css('display', 'none')
// 		console.log('보ㅓ임') 
// 	} else {
// 		$(this).find('div').css('display', 'none');
// 		$(e.target).off();
// 		console.log('안보 ㅓ임')
// }

//$('.faq-detail > div').remove();
//$(this).off(); 
// var no = $(this).find('.title').attr('data-no');
// var appendTag = $(this);
// $.getJSON('../../app/json/faq/detail?no=' + no, function(obj) {
// 	console.log(obj);
// 	$(detailGenerator(obj)).appendTo(appendTag);
//			tbody.html('');appendTag
//			$(detailGenerator(obj)).appendTo(tbody);
//				      
//	      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
//	      $(document.body).trigger('loaded-list');



//페이지를 출력한 후 1페이지 목록을 로딩한다.
//})
//$('#update-btn').on('click',function(){
//console.log($('#no').val());
//$.ajax({
//url: '../../app/json/qna/update,
//type: 'POST',
//data: {
//no: $('#no').val(),      
//content: $('#content').val()
//},
//dataType: 'json',
//success: function(response) {
//location.href = 'index.html';
//},
//fail: function(error) {
//alert('변경 실패!!');
//}
//});
//}
//)


















