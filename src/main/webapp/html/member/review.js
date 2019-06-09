var form = $('.card-list'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    paginateSrc = $('#page-template').html(),
    rating = 0;

Handlebars.registerHelper('paginate', paginate);
var pageGenerator = Handlebars.compile(paginateSrc);

$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");  
  
  loadProfile();
})


function loadProfile() {
  $.getJSON('../../app/json/member/profile',
      function(obj) {

    if (obj.photo != null) {
    $("<img class='rounded-circle'>").attr('src',
        '/heunheuntrip/html/memberprofileupload/' + obj.photo)
        .css('width', '255px')
        .appendTo($('#profileimg'));
  
    
    } else {
    $("<img>").attr('src',
          '/heunheuntrip/html/memberupload/default.jpeg')
          .css('width', '255px')
          .appendTo($('#profileimg'));
    }
    

    $('.main-name').text(obj.name);
    $('.main-email').text(" E-MAIL : " + obj.email);
    $('.main-tel').text(" PHONE : " + obj.tel);
    $('.custom-file').find('label').html(obj.photo);
    no = obj.no;
  }); // Bitcamp.getJSON(
} // loadList()

function loadList(pn) {
  $.getJSON('../../app/json/riw/listMypage?pageNo=' + pn, function(obj) {
    
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

loadList(1);

$(document.body).bind('loaded-list', (e) => {
  
  $('.riw-delete').off('click').on('click', function(e){
    
    var no = $(this).parent().data('no');
    var pn = $(e.target).parent().parent().parent().parent().parent().children('.riw-page').attr('data-page');
    
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
            url: '../../app/json/riw/delete',
            type: 'POST',
            data: {
              no: no
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
  
  $('.riw-update').off('click').on('click', function(e){
    
    var no = $(this).parent().data('no');
    var grd = $(this).parent().data('grd');
    var content = $(this).parent().prev().children().html();
    var pn = $(e.target).parent().parent().parent().parent().parent().children('.riw-page').attr('data-page');
    console.log(pn);
    
    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) 
      var recipient = button.data('whatever') 
      var modal = $(this)
      modal.find('.modal-title').text('Review')
      modal.find('.modal-body input').val(recipient)
      modal.find('#message-text').val(content);
    });
    

    $('.my-rating').starRating({
      totalStars: 5,
      starShape: 'rounded',
      emptyColor: 'lightgray',
      hoverColor: 'gold',
      activeColor: 'gold',
      strokeWidth: 0,
      disableAfterRate: false,
      useGradient: false,
      callback: function(currentRating, $el){
        window.rating = currentRating;
      }
    });
    
    $('.update-btn').off('click').on('click', function(e){
      
      $.ajax({
        url: '../../app/json/riw/update',
        type: 'POST',
        data: {
          no: no,
          grd: window.rating,
          contents: $('#message-text').val()
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
      
    });
    
    
  })
  
});


