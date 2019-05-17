var param = location.href.split('?')[1],
    checkout = $('#checkoutlist').html(),
    checkoutGenerator = Handlebars.compile(checkout);

if (param) {
  document.querySelector('h1').innerHTML = "BLOG DETAIL"
  loadData(param.split('=')[1])
    var el = document.querySelectorAll('.bit-new-item');
  for(e of el){
    e.style.display = 'none';
  }
} else {
  document.querySelector('h1').innerHTML = "새 글"
    var el = document.querySelectorAll('.bit-view-item');
  for(e of el){
    e.style.display = 'none';
  }
  loadCheckOut();
  $('.heun-form').attr('readonly', false);
}

$(document.body).on('loaded-checkout', function() {
  $('.heun-checkout > a').on('click', function() {
    console.log(this);
    $('#dropdownMenuButton').html($(this).html());
    $('#dropdownMenuButton').attr('data-no', $('#title').attr('data-no'));
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



function loadData(no) {
  $.getJSON("../../app/json/blog/detail?no=" + no, function(data) {
      $('#no').val(data.no);
      $('#name').val(data.name);
      $('#title').val(data.title);
      $('#content').val(data.content);
      $('.tooltip').attr('title', data.rmsAddr + " " + data.rmsDetailAddr);
      $('#createdDate').val(data.createdDate);
      $('#rmsName').val(data.rmsName);
      $('#grade').val(data.grade);
  });
  
  $('.drowroom').hide();
};

$('#add-btn').on('click', function() {
  $.ajax({
    url: '../../app/json/blog/add',
    type: 'POST',
    data: {
      userNo: $('#title').attr('data-no'),
      title: $('#title').val(),
      content: $('#content').val(),
      rmsNo: $('#title').attr('data-rno')
    },
    dataType: 'json',
    success: function(response) {
      location.href = 'index.html';
    },
    fail: function(error) {
      alert('등록 실패!!');
    }
  });
});

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

$('#delete-btn').on('click', function() {
  $.ajax({
    url: '../../app/json/blog/delete?no=' + $('#no').val(),
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










