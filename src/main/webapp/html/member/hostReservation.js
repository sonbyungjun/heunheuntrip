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
  $.getJSON('../../app/json/rev/listInHostPage?pageNo=' + pn, function(obj) {
    
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
  
  
});


