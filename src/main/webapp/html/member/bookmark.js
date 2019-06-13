var form = $('.card-list'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    paginateSrc = $('#page-template').html();

Handlebars.registerHelper('paginate', paginate);
var pageGenerator = Handlebars.compile(paginateSrc);

$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");  
  
  loadList(1);
  
  loadProfile();
  
})

function loadProfile() {
  $.getJSON('../../app/json/member/profile',
      function(obj) {
    
    if (obj.member.photo != null) {
    $("<img class='rounded-circle'>").attr('src',
        '/heunheuntrip/html/memberprofileupload/' + obj.member.photo)
        .css('width', '255px')
        .appendTo($('#profileimg'));
  
    
    } else {
    $("<img>").attr('src',
          '/heunheuntrip/html/memberupload/default.jpeg')
          .css('width', '255px')
          .appendTo($('#profileimg'));
    }

    $('.main-name').text(obj.member.name);
    $('.main-email').text(" E-MAIL : " + obj.member.email);
    $('.main-tel').text(" PHONE : " + obj.member.tel);
    no = obj.member.no;
  }); // Bitcamp.getJSON(
} // loadList()


function loadList(pn) {
  $.getJSON('../../app/json/bookmark/list?pageNo=' + pn, function(obj) {
    
    pageNo = obj.pageNo;
    
    form.html('');
    
    obj.pagination = {
        page: obj.pageNo,
        pageCount: obj.totalPage
    };
    
    $(trGenerator(obj)).appendTo(form);
    
    $('.pagination-menu').html('');
    $(pageGenerator(obj)).appendTo('.pagination-menu');
    
    $(document.body).trigger('loaded-list');
    
  }); 
}



$(document.body).bind('loaded-list', (e) => {
  
  $('.room-bookmark').off('click').on('click', function(e){
    var roomNo = $(this).data('no');
    location.href="../room/view.html?no=" + roomNo;
    
  })
  
  $('.bookmark-delete').off('click').on('click', function(e){
    
    var no = $(this).parent().data('no');
    var pn = $(e.target).parent().parent().parent().parent().parent().children('.bookmark-page').attr('data-page');
    
    Swal.fire({
      title: '삭제하시겠어요?',
      text: "찜 해두었던 숙소를 삭제합니다.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 삭제할게요!',
      cancelButtonText: '아니요!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
            '삭제!',
            '찜을 삭제하였습니다.',
            'success'
        ).then(() => {
          
          $.ajax({
            url: '../../app/json/bookmark/delete',
            type: 'POST',
            data: {
              roomNo: no
            },
            dataType: 'json',
            success: function(response) {
              loadList(pn);
              $('#exampleModal').modal("hide");
            },
            fail: function(error) {
              alert('등록 실패!!');
            }
          });
        })
      }
      })
    })

  
  $('.bookmark-update').on('click', function(e){
    
    var no = $(this).parent().data('no');
    var memo = $(this).parent().prev().children('.bookmark-memo').text();
    console.log(memo)
    var content = $.trim(memo);
    var pn = $(e.target).parent().parent().parent().parent().parent().children('.bookmark-page').attr('data-page');
    
    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) 
      var recipient = button.data('whatever') 
      var modal = $(this)
      modal.find('.modal-title').text('Bookmark')
      modal.find('.modal-body input').val(recipient)
      modal.find('#message-text').val(content);
    });

    
    $('.update-btn').off('click').on('click', function(e){
      
      $.ajax({
        url: '../../app/json/bookmark/update',
        type: 'POST',
        data: {
          no: no,
          contents: $('#message-text').val()
        },
        dataType: 'json',
        success: function(response) {
          console.log('실행')
          loadList(pn);
          $('#exampleModal').modal("hide");
        },
        fail: function(error) {
          alert('등록 실패!!');
        }
      });
    });
  })
})

