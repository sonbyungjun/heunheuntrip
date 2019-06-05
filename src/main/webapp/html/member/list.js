var form = $('.item-listing'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    rating = 0;


$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
  
  loadList();
  
})

function loadList() {
  $.getJSON('../../app/json/rev/list', function(obj) {
    
    for(l of obj.list){
      if(l.status === "체크아웃"){
        l.isBtn = true;
      } else {
        l.isBtn = false;
      }
    }
    $(trGenerator(obj)).appendTo(form);
    
    $(document.body).trigger('loaded-list');
    
  }); 

} // loadList()

$(document.body).bind('loaded-list', (e) => {
  $('.riw-write').on('click', function(){
    
    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) 
      var recipient = button.data('whatever') 
      var modal = $(this)
      modal.find('.modal-title').text('Review')
      modal.find('.modal-body input').val(recipient)
      console.log(event);
    });
    

    $('.my-rating').starRating({
      totalStars: 5,
      starShape: 'rounded',
      emptyColor: 'lightgray',
      hoverColor: 'gold',
      activeColor: 'gold',
      initialRating: 4,
      strokeWidth: 0,
      disableAfterRate: false,
      useGradient: false,
      callback: function(currentRating, $el){
        window.rating = currentRating;
      }
    });
    
    $('.insert-riw').on('click', function(){
      
      $.ajax({
        url: '../../app/json/riw/add',
        type: 'POST',
        data: {
          grd: window.rating,
          contents: $('#message-text').val()
        },
        dataType: 'json',
        success: function(response) {
          location.href = 'list.html';
        },
        fail: function(error) {
          alert('등록 실패!!');
        }
      });
      
      console.log($('#message-text').val())
      console.log(window.rating);
    })

  })
});



