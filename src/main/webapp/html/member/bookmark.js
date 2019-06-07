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
  
})


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
  
  $('.bookmark-delete').on('click', function(e){
    
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
  
  $('.bookmark-update').on('click', function(e){
    
    var no = $(this).parent().data('no');
    var memo = $(this).parent().prev().children('.bookmark-memo').text();
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
  
});


