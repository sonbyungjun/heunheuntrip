var tbody = $('tbody'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    paginateSrc = $('#page-template').html();

//handlebars에 paginate 함수를 추가한다.
Handlebars.registerHelper('paginate', paginate);
var pageGenerator = Handlebars.compile(paginateSrc);



//JSON 형식의 데이터 목록 가져오기
function loadList(pn) {

    $.getJSON('../../app/json/qna/list?pageNo=' + pn, 
        function(obj) {
  
      pageNo = obj.pageNo;
  
      tbody.html('');
  
      for (l of obj.list) {
        var re = '';
        for (var i = 1; i < l.step; i++) {
          re += '답변 : ';
        }
        l.re = re;
      } 
  
      // handlebars-paginate 에서 사용할 값을 설정한다.
      obj.pagination = {
          page: obj.pageNo,
          pageCount: obj.totalPage
      };
  
      $(trGenerator(obj)).appendTo(tbody);
  
      $('.pagination-menu').html('');
      $(pageGenerator(obj)).appendTo('.pagination-menu');
  
      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
      $(document.body).trigger('loaded-list');
  
    }); // Bitcamp.getJSON(
  
  } // loadList()
  
  
  //페이지를 출력한 후 1페이지 목록을 로딩한다.
  loadList(1);
  

$(document).ready(function(){
    $('#heun-header').load('../header.html', function(){
        $('.heun-header-nav').removeClass('navbar-over absolute-top');
    });
    
    $('#heun-footer').load('../footer.html', function(){
    });

$('.heun-search > a').on('click', function() {
  
  $('.searchselect').html($(this).text());
  var selector = $(this).data('no');
  
  $('.search-btn').on('click', function(e){
    
  e.preventDefault();
  
  var title = $('.search-box').val()
  
  $.getJSON("../../app/json/qna/search?" + selector + "=" + title, function(obj) {

    tbody.html('');

    for (l of obj.list) {
      var re = '';
      for (var i = 1; i < l.step; i++) {
        re += 'ㄴ ';
      }
      l.re = re;
    } 

    $(trGenerator(obj)).appendTo(tbody);

   
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
  });
});
})



//테이블 목록 가져오기를 완료했으면 제목 a 태그에 클릭 리스너를 등록한다. 


$(document.body).bind('loaded-list', () => {
  // 제목을 클릭했을 때 view.html로 전환시키기
    $('.bit-view-link').on('click', function(e) {
      e.preventDefault();
      
      $.ajax({
        url: '../../app/json/qna/pwdCheck',
        type: 'POST',
        data: {
          qnaNo: $(e.target).attr('data-no')
        },
        dataType: 'json',
        success: function(response) {
          
          if(response.status == 'success'){
            location.href = 'view.html?no=' + $(e.target).attr('data-no');            
          } else {
            var pw = prompt('비밀번호를 입력하세요','');
            $.ajax({
              url: '../../app/json/qna/password',
              type: 'POST',
              data: {
                qnaNo: $(e.target).attr('data-no'),
                pwd: pw
              },
              dataType: 'json',
              success: function(response) {
                console.log(response)
                if(response.status == 'success'){
                  location.href = 'view.html?no=' + $(e.target).attr('data-no');            
                } else {
                  alert('비밀번호가 틀렸습니다');
                }
              },
              fail: function(error) {
                alert('시스템 오류가 발생했습니다.');
              }
            });
          }
        },
        fail: function(error) {
          alert('시스템 오류가 발생했습니다.');
        }
      });
      
    })
    
});

})