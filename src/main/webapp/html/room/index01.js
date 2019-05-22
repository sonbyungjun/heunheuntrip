var tbody = $('.item-listing'),
    templateSrc = $('#list-template').html(),
    trGenerator = Handlebars.compile(templateSrc);

$(document).ready( function() {
  $('#toggle-filters').sidr({
    side: 'left',
    displace: false,
    renaming: false,
    name: 'sidebar',
    source: function () {
      AOS.refresh();
    },

  });
  $("#heun-header").load("/heunheuntrip/html/header.html", function() {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
});

loadList(1);

function loadList(pn) {

  $.getJSON('../../app/json/room/list', function(obj) {
    console.log(obj);
    pageNo = obj.pageNo;
    tbody.html('');
    $(trGenerator(obj)).appendTo(tbody);
    
  });

} 
