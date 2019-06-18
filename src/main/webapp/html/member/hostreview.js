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

// 내 숙소에 회원이 등록한 리뷰를 가지고옴
function loadList(pn) {
  $.getJSON('../../app/json/riw/listhostMypage?pageNo=' + pn, function(obj) {
    
    pageNo = obj.pageNo;
    
    form.html('');
    
    obj.pagination = {
        page: obj.pageNo,
        pageCount: obj.totalPage
    };
    
    $(trGenerator(obj)).appendTo(form);
    
    $('.pagination-menu').html('');
    $(pageGenerator(obj)).appendTo('.pagination-menu');
    
    console.log(obj)
    //핸들바스에서 reply가 빈문자열이 아닌 놈을 찾아서 버튼을 없앰
    for(var i = 0; i < obj.list.length; i++) {
//    console.log(obj.list[i].no);
    
    var a = obj.list[i].no;
    	

    	if($('#aaa-' + a).attr('data-reply') != '') {
    		$('#no-reply-' + a).hide();
    	}
    }
  
    $(document.body).trigger('loaded-list');
 
  }); 
}



loadList(1);

$(document.body).bind('loaded-list', (e) => {
  

  
  $('.riw-update').off('click').on('click', function(e){
  
    
    var no = $(this).parent().data('no');
    var reply = $(this).attr('data-reply');
    var grd = $(this).attr('data-grd');
    var userNo = $(this).attr('data-userNo');
    var name = $(this).attr('data-name');
    var content = $(this).parent().prev().children().html();

    console.log(grd)
    
    var pn = $(e.target).parent().parent().parent().parent().parent().children('.riw-page').attr('data-page');
    
    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) 
      var recipient = button.data('whatever') 
      var modal = $(this)
     // modal.find('.modal-title').text('Review');
      modal.find('.modal-body input').val(recipient);
      modal.find('#user-text').html(name + "님의 후기");
      if(grd >= 3){
   	  modal.find('.grdic').attr('class','far fa-smile-beam grdic');
      } else {
      modal.find('.grdic').attr('class','far fa-angry grdic');
      }
      modal.find('#message-text').html(content);
      modal.find('#remessage-text').val(reply);
    });
    

    $('.update-btn').off('click').on('click', function(e){
      
      $.ajax({
        url: '../../app/json/riw/reply',
        type: 'POST',
        data: {
          no: no,
          userNo : userNo,
          reply: $('#remessage-text').val()
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


