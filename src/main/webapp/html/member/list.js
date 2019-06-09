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
  
  loadList(1);
  
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
  $.getJSON('../../app/json/rev/list?pageNo=' + pn, function(obj) {
    
    form.html('');
    
    for(l of obj.list){
      
      if(l.status === "체크아웃"){
        l.isBtn = true;
      } else {
        l.isBtn = false;
      }
    }
    
    pageNo = obj.pageNo;
    
    obj.pagination = {
        page: obj.pageNo,
        pageCount: obj.totalPage
    };
    
    $(trGenerator(obj)).appendTo(form);
    
    $('.pagination-menu').html('');
    $(pageGenerator(obj)).appendTo('.pagination-menu');
    
    $(document.body).trigger('loaded-list');
    
  }); 

} // loadList()

$(document.body).bind('loaded-list', (e) => {
  
  $('.heun-rev').on('click', function(){
    
  })
  
  $('.riw-write').off('click').on('click', function(e){
    
    var no = $(this).next().data('no');
    var pn = $(e.target).parent().parent().parent().parent().parent().parent().children('.rev-page').attr('data-page');

    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) 
      var recipient = button.data('whatever') 
      var modal = $(this)
      modal.find('.modal-title').text('Review')
      modal.find('.modal-body input').val(recipient)
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
    
    $('.insert-riw').off('click').on('click', function(e){
      
      $.ajax({
        url: '../../app/json/riw/add',
        type: 'POST',
        data: {
          roomNo: no,
          grd: window.rating,
          contents: $('#message-text').val()
        },
        dataType: 'json',
        success: function(response) {
          loadList(pn);
          $('#message-text').val("");
          $('#exampleModal').modal("hide");
        },
        fail: function(error) {
          alert('등록 실패!!');
        }
      });
      
    })

  })
});



