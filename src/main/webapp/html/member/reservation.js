var param = location.href.split('?')[1];

$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
  
  if (param) {
    loadRoom(param.split('=')[1]) 
  }
  
})

function loadRoom(pn) {
  $.getJSON('../../app/json/rev/detail?no=' + pn,
      function(obj) {

    $("<img>").attr('src',
        '/heunheuntrip/upload/roomphoto/Thumbnail/' + obj.rev.thumbnail + '.jpeg')
        .css('width', '255px')
        .css('height', '255px')
        .appendTo($('#profileimg'));  

    $('.main-name').text(obj.rev.rmsName);
    $('.main-checkIn').text(obj.rev.checkIn);
    $('.main-checkOut').text(obj.rev.checkOut);
    $('.main-addr').text(obj.rev.address);
    $('.main-people').text(obj.rev.revPerson + "명");
  }); // Bitcamp.getJSON(
} // loadList()

loadRoom