$(document).ready(function() {

    $('#heun-header').load('../header.html', function(){
        $('.heun-header-nav').removeClass('navbar-over absolute-top');
    });
    
    $('#heun-footer').load('../footer.html', function(){
    });

    $('#summernote').summernote({
      height: 300,
      lang: 'ko-KR' // default: 'en-US'
    });
  });

  var save = function() {
    var markup = $('.click2edit').summernote('code');
    console.log(markup);
    $('.click2edit').summernote('destroy');
  };
