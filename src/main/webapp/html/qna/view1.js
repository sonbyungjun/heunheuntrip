var param = location.href.split('?')[1],
    templateSrc = $('#tr-template').html(),
    category = $('#categorylist').html(),
    cateGenerator = Handlebars.compile(category),
    re = $('#reply').html(),
    reGenerator = Handlebars.compile(re),
    trGenerator = Handlebars.compile(templateSrc);

if (param) {
  document.querySelector('h1').innerHTML = "QnA 조회"
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
  $('.heun-form').attr('readonly', false);
  loadCategory();
}

$(document.body).on('loaded-cate', function() {
  $('.heun-category > a').on('click', function() {
    $('#dropdownMenuButton').html($(this).html());
    $('#dropdownMenuButton').attr('data-no', $(this).attr('data-no'));
  });
})



function loadCategory() {
  $.getJSON('../../app/json/qna/categorylist', function(obj) {
    $(cateGenerator(obj)).appendTo('.heun-category');
    $(document.body).trigger('loaded-cate');
  }); 
};



function loadList(parent, step) {
  $.getJSON('../../app/json/qna/relist?parent=' + parent + '&step=' + step , function(obj) {
    for (l of obj.list) {
      var re = '';
      for (var i = 1; i < l.step; i++) {
        re += 'ㄴ ';
      }
      l.re = re;
    }
    $(trGenerator(obj)).appendTo(tbody);
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
  }); // Bitcamp.getJSON()
};

function loadData(no) {
  $.getJSON("../../app/json/qna/detail?no=" + no, function(data) {
      $('#no').val(data.qnaNo);
      $('#userNo').val(data.name + '(' + data.auth + ')');
      $('#dropdownMenuButton').html(data.category);
      $('#dropdownMenuButton').attr('data-no', data.categoryNo);
      $('#title').val(data.title);
      $('#content').val(data.content);
      $('#createdDate').val(data.createdDate);
      $('#viewCount').val(data.viewCount);
      $('#title').attr('data-parent', data.parent);
      $('#title').attr('data-order', data.order);
      $('#title').attr('data-step', data.step);
      if (data.step > 1) {
        $('.bit-list').removeClass();
        loadList(data.parent, data.step);
      }
      $('#re-add-btn').hide();
      $('.bit-view-password').hide();
  });
};

$('#add-btn').on('click', function() {
  $.ajax({
    url: '../../app/json/qna/add',
    type: 'POST',
    data: {
      categoryNo: $('#dropdownMenuButton').attr('data-no'),
      title: $('#title').val(),
      content: $('#content').val(),
      password: $('#password').val(),
      parent: $('#title').attr('data-parent'),
      order: $('#title').attr('data-order'),
      step: $('#title').attr('data-step'),
    },
    dataType: 'json',
    success: function(response) {
      location.href = 'index.html';
    },
    fail: function(error) {
      alert('등록 실패!!');
    }
  });
})




$('#delete-btn').on('click', function() {
  $.ajax({
    url: '../../app/json/qna/delete?no=' + $('#no').val() + '&parent=' + $('#title').attr('data-parent') +
         '&order=' + $('#title').attr('data-order'),
    type: 'get',
    dataType: 'json',
    success: function(response) {
      location.href = 'index.html';
    },
    fail: function(error) {
      alert('삭제 실패!!' + data.message);
    }
  });
})


//document.querySelector('#delete-btn').onclick = () => {
//  var xhr = new XMLHttpRequest();
//  xhr.onreadystatechange = function() {
//    if(xhr.readyState != 4 || xhr.status != 200){
//      return;
//    } 
//    var data = JSON.parse(xhr.responseText);
//    console.log(data);
//    
//    if(data.status == 'success'){
//      location.href = "index.html"
//    } else {
//      alert('삭제 실패입니다!\n' + data.message)
//    }
//  };
//
//  var no = document.querySelector('#no').value;
//  var parent = document.querySelector('#title').getAttribute('data-parent');
//  var step = document.querySelector('#title').getAttribute('data-step');
//  xhr.open('GET', '../../app/json/qna/delete?no=' + no + '&parent=' + parent + '&step=' + step, true);
//  xhr.send();
//};


$('#re-btn').on('click', function() {
  $(reGenerator()).appendTo('#reply-form');
  $('#re-btn').hide();
  $('#re-add-btn').show();
})




$('#re-add-btn').on('click', function() {
  
$.ajax({
  url: '../../app/json/qna/add',
  type: 'POST',
  data: {
    categoryNo: $('#dropdownMenuButton').attr('data-no'),
    title: $('#re-title').val(),
    content: $('#re-content').val(),
    password: $('#re-password').val(),
    parent: $('#title').attr('data-parent'),
    order: $('#title').attr('data-order'),
    step: $('#title').attr('data-step'),
  },
  dataType: 'json',
  success: function(response) {
    location.href = 'index.html';
  },
  fail: function(error) {
    alert('등록 실패!!');
  }
});

})




$('#update-btn').on('click', function() {
 
  var el = document.querySelectorAll('.update');
  for(e of el){
    $('.heun-form').attr('readonly', false);
  }

  if($('#delete-btn').css("display") != "none") {
    $('#delete-btn').css("display", "none");
    $('.bit-view-password').show();
  } else{
    updateDate($('#no').val());
  }
  
  
  
});



function updateDate(no) {
  $.ajax({
    url: '../../app/json/qna/update?no=' + no,
    type: 'POST',
    data: {
      qnaNo: $('#no').val(),      
      title: $('#title').val(),
      content: $('#content').val(),
      password: $('#password').val()
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










