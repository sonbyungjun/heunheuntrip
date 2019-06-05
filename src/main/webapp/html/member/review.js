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
  
})


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
  
  $('.riw-delete').on('click', function(e){
    
    var no = $(this).parent().data('no');
    
    $.ajax({
      url: '../../app/json/riw/delete',
      type: 'POST',
      data: {
        no: no
      },
      dataType: 'json',
      success: function(response) {
        location.href = 'review.html';
      },
      fail: function(error) {
        alert('등록 실패!!');
      }
    });
  })
  
  $('.riw-update').on('click', function(e){
    
    var no = $(this).parent().data('no');
    var grd = $(this).parent().data('grd');
    var content = $(this).parent().prev().children().html();
    
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
    
    $('.update-btn').on('click', function(e){
      
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
          location.href = 'review.html';
        },
        fail: function(error) {
          alert('등록 실패!!');
        }
      });
      
    });
    
    
  })
  
});


