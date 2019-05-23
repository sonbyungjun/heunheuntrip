var param = location.href.split('?')[1],
    checkout = $('#checkoutlist').html(),
    checkoutGenerator = Handlebars.compile(checkout);

$(document).ready(function () {
  $('#heun-header').load('../header.html', function () {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });

  $('#heun-footer').load('../footer.html', function () {
  });

  loadCheckOut();

  $('#summernote').summernote({
    placeholder: 'Hello bootstrap 4',
    tabsize: 2,
    height: 400
  });

})

function loadCheckOut() {
  $.getJSON('../../app/json/blog/roomCheckOut', function(obj) {
    
    $('#title').attr("data-no", obj.userNo);
    $('#title').attr("data-rno", obj.list[0].rmsNo);
    
    $(checkoutGenerator(obj)).appendTo('.heun-checkout');
    $(document.body).trigger('loaded-checkout');
  }); 
};


$(document.body).on('loaded-checkout', function() {
  $('.heun-checkout > a').on('click', function() {
    console.log(this);
    $('#dropdownMenuButton').html($(this).html());
    $('#dropdownMenuButton').attr('data-no', $('#title').attr('data-no'));
  });
})


$('#add-btn').on('click', function () {

  var markupStr = $('#summernote').summernote('code');

  $.ajax({
    url: '../../app/json/blog/add',
    type: 'POST',
    data: {
      userNo: $('#title').attr('data-no'),
      title: $('#title').val(),
      content: markupStr,
      rmsNo: $('#title').attr('data-rno')
    },
    dataType: 'json',
    success: function (response) {
      location.href = 'index.html';
    },
    fail: function (error) {
      alert('등록 실패!!');
    }
  });
})





