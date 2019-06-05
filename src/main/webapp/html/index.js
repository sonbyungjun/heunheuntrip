$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function() {
    $(".heun-search-form").hide();
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
});
 
$('#heun-search').click(function (e) {
  search($('#search-value').val());
});

// 검색창에서 엔터를 누를시 클릭이벤트를 발생시킨다.
$('#search-value').keydown(function(key) {
  if (key.keyCode === 13) {
    $('#heun-search').trigger('click');
  }
})