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
        console.log(obj.userAuth)
        
        for(var l of obj.list){
          if(obj.userAuth === "일반회원"){
              l.usrA = true;

          } else if(obj.userAuth === "호스트") {
            l.usrA = false;
          }
        }
  
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

    $('.room-title').off('click').on('click', function(e){
    
      var roomNo = $(e.target).parent().attr('data-no');
  
      console.log(roomNo);
      location.href="/heunheuntrip/html/room/view.html?no=" + roomNo;
      
    })
    
  })