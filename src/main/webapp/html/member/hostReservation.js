var form = $('.card-list'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    paginateSrc = $('#page-template').html(),
    pageNo = 0;

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
        '/heunheuntrip/app/json/images/down/' + obj.member.photo)
        .css('width', '255px')
        .css('height', '255px')
        .appendTo($('#profileimg'));
    } else {
      $("<img>").attr('src',
        '/heunheuntrip/app/json/images/down/defualt.jpeg')
        .css('width', '255px')
        .css('height', '255px')
        .appendTo($('#profileimg'));
    }

    $('.main-name').text(obj.member.name);
    $('.main-email').text(" E-MAIL : " + obj.member.email);
    $('.main-tel').text(" PHONE : " + obj.member.tel);
    no = obj.member.no;
  });
} // loadProfile()


function loadList(pn) {
  
  window.pageNo = $('#pageNo').data('no');
  
  $.getJSON('../../app/json/rev/listInHostPage?pageNo=' + pn, function(obj) {
    
    
    for(l of obj.list){
      if(l.revDelete === 1){
        l.revDelete = true;
      } else {
        l.revDelete = false;
      }
    }
    console.log(obj.list);
    
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
  
  // 예약 삭제
  $('#rev-delete').off('click').on('click', function(e){
    e.preventDefault();
    
    var revNo = $(e.target).data('no');
    
    Swal.fire({
      text: "예약을 삭제하시겠습니까?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result) => {

      if (result.value) {
        
        $.ajax({
          url: '../../app/json/rev/deleteInHostpage',
          type: 'POST',
          data: {
            no : revNo
          },
          dataType: 'json',
          success: function(response) {
            
            if(response.success == "success"){
              Swal.fire(
                  'Success!',
                  '삭제되었습니다.',
                  'success'
                ).then(() => {
                  loadList(window.pageNo);
                  window.pageNo = 0;
                })
            }
          },
          fail: function(error) {
            alert('등록 실패!!');
          }
        });
        
      }
    })
    
  });
  
  
});


