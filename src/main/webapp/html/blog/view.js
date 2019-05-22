var param = location.href.split('?')[1],
  checkout = $('#checkoutlist').html(),
  checkoutGenerator = Handlebars.compile(checkout);


$(document).ready(function () {
  $('#heun-header').load('../header.html', function () {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });

  $('#heun-footer').load('../footer.html', function () {
  });

  if (param) {
    loadData(param.split('=')[1])
  }

});



function loadCheckOut() {
  $.getJSON('../../app/json/blog/roomCheckOut', function (obj) {

    $('#title').attr("data-no", obj.userNo);
    $('#title').attr("data-rno", obj.list[0].rmsNo);

    $(checkoutGenerator(obj)).appendTo('.heun-checkout');
    $(document.body).trigger('loaded-checkout');
  });
};



function loadData(no) {
  $.getJSON("../../app/json/blog/detail?no=" + no, function (data) {
    $('#no').attr('data-no', data.no);
    $('#name').html(data.name);
    $('h1').html(data.title);
    $('#cont').html(data.content);
    $('.tooltip').attr('title', data.rmsAddr + " " + data.rmsDetailAddr);
    $('#createdDate').html(data.createdDate);
    $('#rmsName').html(data.rmsName);
    $('#grade').html(data.grade);
  });

  $('.drowroom').hide();
};



$('#delete-btn').on('click', function () {

  $.ajax({
    url: '../../app/json/blog/delete?no=' + $('#no').attr('data-no'),
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      location.href = 'index.html';

    },
    fail: function (error) {
      alert('삭제 실패!!');
    }
  });
});

