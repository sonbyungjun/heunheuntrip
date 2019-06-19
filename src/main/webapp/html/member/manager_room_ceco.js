$.holdReady(true);
(function($) {
  $.ajax({
    url: '/heunheuntrip/app/json/auth/authCheck',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      
      if(response.auth == "관리자"){
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

var form = $('.item-listing'),
templateSrc = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSrc),
rating = 0,
paginateSrc = $('#page-template').html();

Handlebars.registerHelper('paginate', paginate);
var pageGenerator = Handlebars.compile(paginateSrc);



$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
  $(document.body).trigger('loaded-list');
  loadProfile();
}) 

$(document).on('load',function() {
	Loadroomlist(0);
})
"use strict"
function Loadroomlist(pn) {
  $.ajax({
    url: '../../app/json/room/managerroom?pageNo=' + pn,
    type: 'GET',
    data: {
      no: 0
    },
    dataType: 'json',
    success: function (response) {
      console.log(response);
      pageNo = response.pageNo;
      form.html('');

      response.pagination = {
          page: response.pageNo,
          pageCount: response.totalPage
      };
      $(trGenerator(response)).appendTo(form);
      $('.pagination-menu').html('');
      $(pageGenerator(response)).appendTo('.pagination-menu');
      $(document.body).trigger('loaded-list');
    },
  });
}

$(document.body).bind('loaded-list', () => {
  $('.del').on('click', function () {
    var no = $(this).data('no')

    Swal.fire({
      title: '잠깐!',
      text: "정말로 삭제 하시겠습니까?",
      type: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: '../../app/json/room/delete',
          type: 'GET',
          data: {
            no: no
          },
          dataType: 'json',
          success: function (response) {
            Swal.fire({
              type: 'success',
              title: "정상적으로 삭제 되었습니다!"
            }).then((result) => {
              if (result.value) {
                location.href = 'hostlist.html'
              }
            })
          },
          error: function (error) {
            alert('시스템 오류가 발생했습니다.');
          }
        });
      } else {
      }
    })

  })
});
$(document.body).bind('loaded-list', (e) => {
  $('.roomcontent').on('click', function () {

    var rno = $(this).attr('data-no')
    detail(rno)
  })
})


function detail(rno){

  $.ajax({
    url: '../../app/json/room/detail',
    type: 'GET',
    data: {
      no:rno
    },
    dataType: 'json',
    success: function (response) {
      //$('.media-heading').text(response.name)
      $('.room-photo').attr('src', "/heunheuntrip/app/json/images/down/" + response.thumbnail);
      $('.room-name').html(response.name)
      $('.room-area').html("<i class='fas fa-subway'></i>  " + response.area)
      $('.room-address').html("<i class='fas fa-map-marker-alt'></i>  "+response.address + " " + response.detailAddress)
      $('.room-price').html("<i class='fas fa-won-sign'></i>  "+response.price + "원")
      $('.room-type').html("<i class='fas fa-home'></i>  " +response.type )
      $('.room-maxperson').html("<i class='fas fa-user'></i> " + "최대" +response.maxPerson + "명")
      $('.room-bath').html("<i class='fas fa-bath'></i> "+ response.bath + "개")
      $('.room-bed').html("<i class=' fa fa-bed'></i> "+response.bed + "개")
      
      
      $('#room-details').html(response.details)
      $('#room-reservation').html(response.reservation)
      $('#room-welcome').html(response.welcome)
      $('#room-traffic').html(response.traffic)
      $('#room-content').html(response.content)
      
      
//      $('.media-left').html('')
//      $("<img class='media-room'>").attr('src',
//          '/heunheuntrip/app/json/images/down/' + response.thumbnail)
//          .css('width', '50px')
//          .css('height', '50px')
//          .appendTo($('.media-left'));
      
      
    },
    error: function (error) {
      alert('시스템 오류가 발생했습니다.');
    }
  });

}








