var param = location.href.split('?')[1];


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



function loadData(no) {
  $.getJSON("../../app/json/blog/detail?no=" + no, function (data) {
    $('#no').attr('data-no', data.blog.no);
    $('#name').html(data.blog.name);
    $('h1').html(data.blog.title);
    $('#cont').html(data.blog.content);
    $('.tooltip').attr('title', data.blog.rmsAddr + " " + data.blog.rmsDetailAddr);
    $('#createdDate').html(data.blog.createdDate);
    $('#rmsName').html("방문했던 게스트하우스 : " + data.blog.rmsName);
    $('#grade').html("평점 : " + data.blog.grade);
    
    
    if(data.blog.userNo != data.userNo){
      $('#delete-btn').hide();
      $('#update-btn').hide();
    }
  });

  $('.drowroom').hide();
  $('#add-btn').hide();
  
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

