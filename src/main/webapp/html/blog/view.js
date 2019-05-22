var param = location.href.split('?')[1],
    checkout = $('#checkoutlist').html(),
    checkoutGenerator = Handlebars.compile(checkout);


$(document).ready(function(){
  $('#heun-header').load('../header.html', function(){
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });

  $('#heun-footer').load('../footer.html', function(){
  });
});



function loadCheckOut() {
  $.getJSON('../../app/json/blog/roomCheckOut', function(obj) {
    
    $('#title').attr("data-no", obj.userNo);
    $('#title').attr("data-rno", obj.list[0].rmsNo);
    
    $(checkoutGenerator(obj)).appendTo('.heun-checkout');
    $(document.body).trigger('loaded-checkout');
  }); 
};



function loadData(no) {
  $.getJSON("../../app/json/blog/detail?no=" + no, function(data) {
      $('#fbwogus').attr('data-no', data.no);
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




/*
$('#update-btn').on('click', function() {
  
  var el = document.querySelectorAll('.update');
  for(e of el){
    $('.heun-form').attr('readonly', false);
  }

  if($('#delete-btn').css("display") != "none") {
    $('#delete-btn').css("display", "none");
  } else{
    updateDate($('#no').val());
  }
});



function updateDate() {
  $.ajax({
    url: '../../app/json/blog/update',
    type: 'POST',
    data: {
      no: $('#no').val(),      
      title: $('#title').val(),
      content: $('#content').val()
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
*/
$('#delete-btn').on('click', function() {
  console.log($('#fbwogus').attr('data-no'));
  $.ajax({
    url: '../../app/json/blog/delete?no=' + $('#fbwogus').attr('data-no'),    
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      location.href = 'index.html';
  
    },
    fail: function(error) {
      alert('삭제 실패!!');
    }
  });
});

