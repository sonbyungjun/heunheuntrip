var param = location.href.split('?')[1],
    form = $('#heun-detail'),
    templateSrc = $('#detail-template').html(),
    listGenerator = Handlebars.compile(templateSrc),
    no = '';
if (param) {
  no = param.split('=')[1];
}

$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");


});

$.ajax({
  url: '../../app/json/room/detail?no=' + no,
  type: 'GET',
  dataType: 'json',
  success: function (response) {
    
    form.html('');
    
    $(listGenerator(response)).appendTo(form);
    
    $('body').trigger('loaded-list');
    
  },
  fail: function (error) {
    alert('시스템 오류가 발생했습니다.');
  }
});