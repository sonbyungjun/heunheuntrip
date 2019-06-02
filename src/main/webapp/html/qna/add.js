var category = $('#categorylist').html(),
  cateGenerator = Handlebars.compile(category);

$(document).ready(function () {
  $('#heun-header').load('../header.html', function () {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });

  $('#heun-footer').load('../footer.html', function () {
  });

  $('#summernote').summernote({
    placeholder: '문의사항 분류를 선택하고, 문의하실 내용을 작성해주세요.',
    tabsize: 2,
    height: 400
  }); 

  loadCategory();
})

function loadCategory() {
  $.getJSON('../../app/json/qna/categorylist', function (obj) {
    $(cateGenerator(obj)).appendTo('.heun-category');
    $(document.body).trigger('loaded-cate');
  });
};

$(document.body).on('loaded-cate', function () {
  $('.heun-category > a').on('click', function () {
    $('#dropdownMenuButton').html($(this).html());
    $('#dropdownMenuButton').attr('data-no', $(this).attr('data-no'));
  });
})

$('#add-btn').on('click', function () {

  var markupStr = $('#summernote').summernote('code');

  $.ajax({
    url: '../../app/json/qna/add',
    type: 'POST',
    data: {
      categoryNo: $('#dropdownMenuButton').attr('data-no'),
      title: $('#title').val(),
      content: markupStr,
      password: $('#password').val(),
      parent: $('#title').attr('data-parent'),
      order: $('#title').attr('data-order'),
      step: $('#title').attr('data-step')
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





