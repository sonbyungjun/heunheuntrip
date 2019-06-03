$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
})


$('.riw-write').on('click', function(){
  
  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) 
    var recipient = button.data('whatever') 
    var modal = $(this)
    modal.find('.modal-title').text('Review')
    modal.find('.modal-body input').val(recipient)
  })
  
  $(".my-rating").starRating({
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
        console.log(currentRating);
    }
});
  
  

})