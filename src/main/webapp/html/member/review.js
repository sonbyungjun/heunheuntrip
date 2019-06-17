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
  loadList(1);
  loadProfile();
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
    
    //핸들바스에서 reply가 빈문자열이 아닌 놈을 찾아서 버튼을 없앰
    for(var i = 0; i < obj.list.length; i++) {
    
    var a = obj.list[i].no;
    	
    	if($('#aaa-' + a).attr('data-reply') == '') {
    		$('#no-reply-' + a).hide();
    	}
    }
    
    $(document.body).trigger('loaded-list');
    
  }); 
}

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
  
  $('.reply-complete').off('click').on('click',function(e){
    
    var review = $(e.target).parent().parent().prev().children('h6').text();
    var reply = $(e.target).parent().parent().prev().children('h6').attr('data-reply');
    var hostname = $(e.target).parent().parent().prev().children('h6').attr('data-hostname');
    var name = $(e.target).parent().parent().prev().children('h6').attr('data-name');
    
    // 사진 데이터
    var photo = $(e.target).parent().parent().prev().attr('data-photo');
    var hostphoto = $(e.target).parent().parent().prev().attr('data-hostphoto');
    
    $('.riw-conts').text(review);
    $('.riw-name').text(name + "님의 리뷰 : ");
    $('.reply-conts').text(reply);
    $('.reply-hostname').text(hostname + "님의 답글 : ");
    
    $('.riw-photo').attr('src', "/heunheuntrip/app/json/images/down/" + photo);
    $('.reply-photo').attr('src', "/heunheuntrip/app/json/images/down/" + hostphoto);
    
  })
    
  
});


