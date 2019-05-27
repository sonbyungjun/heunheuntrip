var param = location.href.split('?')[1],
checkout = $('#checkoutlist').html(),
checkoutGenerator = Handlebars.compile(checkout);

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
})


function loadCheckOut() {
  $.getJSON('../../app/json/blog/roomCheckOut', function (obj) {

    $('#title').attr("data-no", obj.userNo);
    $('#title').attr("data-rno", obj.list[0].rmsNo);

    $(checkoutGenerator(obj)).appendTo('.heun-checkout');
    $(document.body).trigger('loaded-checkout');
  });
};


$(document.body).on('loaded-checkout', function () {
  $('.heun-checkout > a').on('click', function () {
    console.log(this);
    $('#dropdownMenuButton').html($(this).html());
    $('#dropdownMenuButton').attr('data-no', $('#title').attr('data-no'));
  });
})

$('#fileupload').fileupload({
  url: '../../app/json/blog/add',       
  dataType: 'json',         
  add: function (e, data) {
    console.log('add()...');
    $.each(data.files, function (index, file) {
      console.log('선택한 파일: ' + file.name);
    });
    $('#add-btn').click(function() {
      Swal.fire({
        title: '잠깐!',
        text: "후기를 등록하시겠어요?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네, 등록하겠습니다!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            '성공!!',
            '당신의 후기가 성공적으로 등록됐어요.',
            'success'
          ).then(() => {
            data.submit();
            console.log(data);
            // location.href="index.html";
          })
        }
      })
      
    });
  },
  submit: function (e, data) { // submit 이벤트가 발생했을 때 호출됨. 서버에 전송하기 전에 호출됨.
    console.log('submit()...');
    // data 객체의 formData 프로퍼티에 일반 파라미터 값을 설정한다.
    data.formData = {
        userNo: $('#title').attr('data-no'),
        title: $('#title').val(),
        content: $('#summernote').summernote('code'),
        rmsNo: $('#title').attr('data-rno')
    };
  }
}); 













