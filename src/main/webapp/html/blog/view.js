var param = location.href.split('?')[1]
 


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
    $('#no').attr('data-no', data.no);
    $('#no').attr('data-title', data.title);
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



$('#update-btn').on('click', function() {

  $('#add-btn').hide();
  
  $('h1').contents().unwrap().wrap( '<textarea id="update-title"></textarea>' );
  
  $('.update-content').contents().unwrap().wrap( '<div id="summernote"></div>' );
 
  $('#summernote').summernote({  //썸머노트 활성화 시작
    placeholder: 'Hello bootstrap 4',
    tabsize: 2,
    height: 400
  });
 
  if($('#delete-btn').css("display") != "none") {
      $('#delete-btn').css("display", "none");
      
  } else{
    updateDate();
  }

});



function updateDate() {
  var markupStr = $('#summernote').summernote('code');
  
  $.ajax({
    url: '../../app/json/blog/update',
    type: 'POST',
    data: {
      no: $('#no').attr('data-no'),      
      title: $('#update-title').val(),
      content: markupStr
        },
    dataType: 'json',
    success: function(response) {
      location.href = 'index.html';
    },
    fail: function(error) {
      alert('변경 실패!!');
    }
  });
}



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

