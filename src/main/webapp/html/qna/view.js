var param = location.href.split('?')[1],
    templateSrc = $('#tr-template').html(),
    category = $('#categorylist').html(),
    cateGenerator = Handlebars.compile(category),
    re = $('#reply').html(),
    reGenerator = Handlebars.compile(re),
    trGenerator = Handlebars.compile(templateSrc);


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
    

$(document).ready(function(){
    $('#heun-header').load('../header.html', function(){
        $('.heun-header-nav').removeClass('navbar-over absolute-top');
    });
    
    $('#heun-footer').load('../footer.html', function(){
    });

    if (param) {
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
})


  function loadData(no) {
    $.getJSON("../../app/json/qna/detail?no=" + no, function(data) {
        $('#no').val(data.qnaNo);
        $('#userNo').html(data.name + '(' + data.auth + ')');
        $('#dropdownMenuButton').html(data.category);
        $('#dropdownMenuButton').attr('data-no', data.categoryNo);
        $('#title').html(data.title);
        $('#cont').html(data.content);
        $('#createdDate').html(data.createdDate);
        $('#title').attr('data-parent', data.parent);
        $('#title').attr('data-order', data.order);
        $('#title').attr('data-step', data.step);
    });
  };
  
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


  $('#re-btn').on('click', function() {
    $(reGenerator()).appendTo('#reply-form');
    $('#re-btn').hide();
    $('#re-add-btn').show();
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