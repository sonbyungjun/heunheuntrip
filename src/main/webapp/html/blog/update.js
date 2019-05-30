var param = location.href.split('?')[1],
  blogNo = param.split('=')[1],
  imageCheck = false,
  filenames = [],
  filecheck = false;

$(document).ready(function () {

  $('#heun-header').load('../header.html', function () {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });

  $('#heun-footer').load('../footer.html', function () {
  });

  if (param) {
    loadData(blogNo)
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

    $(data.blog.photoFiles).each(function (i, e) {
      filenames.push(e.file);
    });

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
    success: function (url) {
      filenames.push(url);
      var path = '/heunheuntrip/upload/blogphoto/' + url
      $(el).summernote('editor.insertImage', path);
      $('#imageBoard > ul').append('<li><img src="' + path + '" width="480" height="auto"/></li>');
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


$('#fileupload').on('change', function () {
  filecheck = true;
  $('#fileupload').fileupload({
    url: '../../app/json/blog/update',
    dataType: 'json',
    add: function (e, data) {
      $.each(data.files, function (index, file) {
        $('.custom-file-label').html(file.name);
      });

      $('#update-btn').click(function () {
        data.submit();
      })
    },
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
      if (data.status === "success") {
        href.location = '/';
      }
    },
    submit: function (e, data) { // submit 이벤트가 발생했을 때 호출됨. 서버에 전송하기 전에 호출됨.
      console.log('submit()...');
      // data 객체의 formData 프로퍼티에 일반 파라미터 값을 설정한다.
      data.formData = {
        no: blogNo,
        title: $('#title').val(),
        content: $('#summernote').summernote('code'),
        filenames: filenames
      };
    }
  });
})


if (!filecheck) {
  $('#update-btn').click(function () {
    var formdata = new FormData();
    formdata.append('files', {});
    
    var allData = {
      no: blogNo,
      title: $('#title').val(),
      content: $('#summernote').summernote('code'),
      filenames: filenames,
      files: formdata
    };

    $.ajax({
      url: '../../app/json/blog/update',
      type: 'POST',
      data: allData,
      dataType: 'json',
      success: function (response) {
        if (response.status == 'success') {
          location.href = 'index.html';
        } else {
          // 테스트용
          location.href = 'index.html';
        }
      },
      fail: function (error) {
        alert('시스템 오류가 발생했습니다.');
      }
    });
    filecheck = false;
  })
}