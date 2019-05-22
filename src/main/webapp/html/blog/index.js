var tbody = $('tbody'),
templateSrc = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSrc);


$(document).ready(function(){
  $('#heun-header').load('../header.html', function(){
      $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });
  
  $('#heun-footer').load('../footer.html', function(){
  });
})


//JSON 형식의 데이터 목록 가져오기
function loadList() {

  $.ajax({
    url: '../../app/json/blog/list',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      $(trGenerator(response)).appendTo(tbody);
      $(document.body).trigger('loaded-list');
    },
    fail: function(error) {
      alert('시스템 오류가 발생했습니다.');
    }
  });

} // loadList()


//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList();

$(document.body).bind('loaded-list', () => {

  $('.bit-view-link').on('click', function(e){
    e.preventDefault();
    window.location.href = 'view.html?no=' + $(e.target).attr('data-no');
  })

  $('.check-btn').on('click', function(e){
    e.preventDefault();
    $.ajax({
      url: '../../app/json/blog/checkUser',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success'){
       //          $('.title').attr("userNo", response.userNo);
      //          $('.title').attr("userName", response.userName);
          location.href = 'add.html';            
        } else {
          alert('체크아웃 목록이 없어 블로그를 작성할 수 없습니다.');
        }
      },
      fail: function(error) {
        alert('시스템 오류가 발생했습니다.');
      }
    });
  });
}); 

