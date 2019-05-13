var param = location.href.split('?')[1],
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc);

if (param) {
  document.querySelector('h1').innerHTML = "QnA 조회"
    loadData(param.split('=')[1])
    var el = document.querySelectorAll('.bit-new-item');
  for(e of el){
    e.style.display = 'none';
  }
} else {
  document.querySelector('h1').innerHTML = "새 글"
    var el = document.querySelectorAll('.bit-view-item');
  for(e of el){
    e.style.display = 'none';
  }
}

function loadList(parent, step) {
  $.getJSON('../../app/json/qna/relist?parent=' + parent + '&step=' + step , function(obj) {
    
    for (l of obj.list) {
      var re = '';
      for (var i = 1; i < l.step; i++) {
        re += 're: ';
      }
      l.re = re;
    }
    $(trGenerator(obj)).appendTo(tbody);
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
  }); // Bitcamp.getJSON()
};

function loadData(no) {
  $.getJSON("../../app/json/qna/detail?no=" + no, function(data) {
      
      $('#no').val(data.qnaNo);
      $('#userNo').val(data.name + '(' + data.auth + ')');
      $('#categoryNo').val(data.category);
      $('#title').val(data.title);
      $('#content').val(data.content);
      $('#createdDate').val(data.createdDate);
      $('#viewCount').val(data.viewCount);
      
      if (data.step > 1) {
        $('.bit-list').removeClass();
        $(document.body).trigger('loaded-Data');
        loadList(data.parent, data.step);
      }
  });
};


















