$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function() {
    $('#heun-search-input').hide();
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
});

$('#heun-search').click(function (e) {

  var places = new daum.maps.services.Places();

  places.keywordSearch($('#search-value').val(), function(result, status) {
    if (status === daum.maps.services.Status.OK) {
      console.log(result[0].y, result[0].x);

      location.href = 'room/index.html?lati=' + result[0].y + '&longi=' + result[0].x;

    }
  });

});



// 검색창에서 엔터를 누를시 클릭이벤트를 발생시킨다.
$('#search-value').keydown(function(key) {
  if (key.keyCode === 13) {
    $('#heun-search').trigger('click');
  }
})