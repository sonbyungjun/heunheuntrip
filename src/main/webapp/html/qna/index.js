var tbody = $('tbody'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc);

// JSON 형식의 데이터 목록 가져오기
function loadList(pn) {
  
  $.getJSON('../../app/json/qna/list', 
    function(obj) {
      
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
      
    }); // Bitcamp.getJSON()
  
} // loadList()


//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList(1);


// 테이블 목록 가져오기를 완료했으면 제목 a 태그에 클릭 리스너를 등록한다. 
$(document.body).bind('loaded-list', () => {
  // 제목을 클릭했을 때 view.html로 전환시키기
  $('.bit-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
      $(e.target).attr('data-no');
  });
});







