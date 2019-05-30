var param = location.href.split('?')[1],
    imageCheck = false,
    filenames = [];

$(document).ready(function () {

  $('#heun-header').load('../header.html', function () {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });

  $('#heun-footer').load('../footer.html', function () {
  });
  
  if (param) {
    loadData(param.split('=')[1])
  }

  $('#summernote').summernote({
    placeholder: 'Hello bootstrap 4',
    tabsize: 2,
    height: 400,
    focus: true,
    callbacks: {
      onImageUpload: function (files, editor, welEditable) {
        for (var i = files.length - 1; i >= 0; i--) {
          sendFile(files[i], this);
        }
      }
    }
  });

  if (imageCheck == false) {
    $('#add-btn').hide();
  }
})

function loadData(no) {
  
  $.getJSON("../../app/json/blog/detail?no=" + no, function (data) {
    $('#no').attr('data-no', data.blog.no);
    $('#no').attr('data-title', data.blog.title);
    $('#title').val(data.blog.title);
    
    var markupStr = data.blog.content;
    
    $('#summernote').summernote('code', markupStr);

  }); // getJSON의 끝

}

function sendFile(file, el) {
  var form_data = new FormData();

  form_data.append('file', file);

  $.ajax({
    data: form_data,
    type: "POST",
    url: '../../app/json/blog/addfile',
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false,
    success: function(url) {
      filenames.push(url);
      var path = '/heunheuntrip/upload/blogphoto/' + url
      $(el).summernote('editor.insertImage', path);
      $('#imageBoard > ul').append('<li><img src="'+path+'" width="480" height="auto"/></li>');
    }
  });
}

function check_input() {
  summernote = $('#summernote').summernote('code');
  title = $('.heun-title').val();

  if (title == undefined || title == "") {
    Swal.fire({
      type: 'error',
      title: '필수 입력사항이 비었습니다.',
      text: '제목을 반드시 입력해주세요!',
    })
    return "error";
  } else if (summernote == '<p><br></p>') {
    Swal.fire({
      type: 'error',
      title: '필수 입력사항이 비었습니다.',
      text: '내용을 반드시 입력해주세요.',
    })
    return "error";
  }
}


$('#error-btn').on('click', function () {
  Swal.fire({
    type: 'error',
    title: '필수 입력사항이 비었습니다.',
    text: '메인이미지를 반드시 업로드해주세요.',
  })
});

$('#fileupload').fileupload({
  url: '../../app/json/blog/add',
  dataType: 'json',
  add: function (e, data) {

    if (imageCheck = true) {
      $('#add-btn').show();
      $('#error-btn').hide();
    }

    console.log('add()...');

    $.each(data.files, function (index, file) {
      console.log('선택한 파일: ' + file.name);
      $('.custom-file-label').html(file.name);
    });

    $('#add-btn').click(function () {

      Swal.fire({
        title: '잠깐!',
        text: "후기를 등록하시겠어요?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네, 등록하겠습니다!',
        cancelButtonText: '아뇨, 다시 한번 볼게요!'
      }).then((result) => {

        console.log($('#summernote').summernote('code'));
        data.formData = {
          title: $('#title').val(),
          content: $('#summernote').summernote('code'),
          rmsNo: $('#title').attr('data-rno'),
          filenames: filenames
        };


        if (check_input() == "error") {
          return;
        }

        data.submit();

        if (result.value) {

          Swal.fire(
            '성공!!',
            '당신의 후기가 성공적으로 등록됐어요.',
            'success'
          ).then(() => {
            location.href = "index.html";
          })
        }
      })

    });
  }
});

