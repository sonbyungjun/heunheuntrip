$.holdReady(true);
(function($) {
  $.ajax({
    url: '/heunheuntrip/app/json/auth/authCheck',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      
      if(response.auth == "일반회원"){
        $.holdReady(false);
      } else {
        $('#main').html('');
        Swal.fire({
          type: 'error',
          title: "잘못된 접근입니다!",
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            location.href = '/heunheuntrip/html'
          }
        })
      }
    },
    error: function (error) {
    }
  })
})(jQuery);

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
