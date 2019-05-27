var param = location.href.split('?')[1],
checkout = $('#checkoutlist').html(),
checkoutGenerator = Handlebars.compile(checkout);
imageCheck = false;

$(document).ready(function () {
  $('#heun-header').load('../header.html', function () {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });

  $('#heun-footer').load('../footer.html', function () {
  });

  loadCheckOut();

  $('#summernote').summernote({
    placeholder: 'Hello bootstrap 4',
    tabsize: 2,
    height: 400
  });
  
  if(imageCheck == false){
    $('#add-btn').hide();
  } 
})


function loadCheckOut() {
  $.getJSON('../../app/json/blog/roomCheckOut', function (obj) {

    $('#title').attr("data-no", obj.userNo);
    $('#title').attr("data-rno", obj.list[0].rmsNo);

    $(checkoutGenerator(obj)).appendTo('.heun-checkout');
    $(document.body).trigger('loaded-checkout');
  });
};

function check_input() {
  dropdown = $('.heun-cc').html();
  summernote = $('#summernote').summernote('code');
  title = $('.heun-title').val();

  console.log(title);
  console.log(dropdown);
  console.log(summernote);

  if(title == undefined || title == "") {
    Swal.fire({
      type: 'error',
      title: '필수 입력사항이 비었습니다.',
      text: '제목을 반드시 입력해주세요!',
    })
    return "error";
  } else if(dropdown == '어느 숙소에 방문하셨나요?') {
    Swal.fire({
      type: 'error',
      title: '필수 입력사항이 비었습니다.',
      text: '방문하신 숙소를 반드시 선택해주세요.',
    })
    return "error";
  } else if(summernote == '<p><br></p>') {
    Swal.fire({
      type: 'error',
      title: '필수 입력사항이 비었습니다.',
      text: '내용을 반드시 입력해주세요.',
    })
    return "error";
  }
}

$(document.body).on('loaded-checkout', function () {
  $('.heun-checkout > a').on('click', function () {
    console.log(this);
    $('#dropdownMenuButton').html($(this).html());
    $('#dropdownMenuButton').attr('data-no', $('#title').attr('data-no'));
  });
})


$('#error-btn').on('click', function(){
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
    if(imageCheck = true){
      $('#add-btn').show();
      $('#error-btn').hide();
    } 
    console.log('add()...');
    $.each(data.files, function (index, file) {
      console.log('선택한 파일: ' + file.name);
      $('.custom-file-label').html(file.name);
    });
    $('#add-btn').click(function() {

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

        data.formData = {
          userNo: $('#title').attr('data-no'),
          title: $('#title').val(),
          content: $('#summernote').summernote('code'),
          rmsNo: $('#title').attr('data-rno')
        };

        
        if(check_input() == "error"){
          return;
        }

        data.submit();

        if (result.value) {

          Swal.fire(
            '성공!!',
            '당신의 후기가 성공적으로 등록됐어요.',
            'success'
          ).then(() => {
             location.href="index.html";
          })
        }
      })
      
    });
  }
}); 













