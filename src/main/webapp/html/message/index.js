var templateSrc = $('#index-template').html(),
    indexGenerator = Handlebars.compile(templateSrc),
    form = $('.item-listing');

$(document).ready(function () {
    $("#heun-header").load("/heunheuntrip/html/header.html", function () {
      $(".heun-header-nav").removeClass("navbar-over absolute-top");
    });
    $("#heun-footer").load("/heunheuntrip/html/footer.html");
    
    loadList();

  })
  


  function loadList() {
    $.getJSON('../../app/json/hostqna/indexlist',
      function (obj) {
  
        console.log(obj)
  
        form.html('');
        $(indexGenerator(obj)).appendTo(form);
        $(document.body).trigger('loaded-list');
      });
  }

  $(document.body).on('loaded-list', function() {

    $('.send-message').off('click').on('click', function(e){
    
      var revNo = $(e.target).attr('data-no');
  
      console.log(revNo);
      location.href="/heunheuntrip/html/message/send.html?no=" + revNo;
      
    })
    
  })