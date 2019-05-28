$(document).ready(function () {
	$("#heun-header").load("/heunheuntrip/html/header.html", function () {
		$(".heun-header-nav").removeClass("navbar-over absolute-top");
	});
	$("#heun-footer").load("/heunheuntrip/html/footer.html");
})



$("#email").keyup(function () {
	var email = $(this).val();
	// 이메일 검증할 정규 표현식
	var reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z\-]+\.[A-Za-z\-]{2,8}$/;
	if (reg.test(email)) {//정규표현식을 통과 한다면
		$("#emailErr").hide();
		successState("#email");
	} else {//정규표현식을 통과하지 못하면
		$("#emailErr").show();
		errorState("#email");
	}
});

// 파일업로드를 선택했을때 버튼이 바뀌게 만듬

// 인증 번호 보내기
$('#add-btn').on('click', function () {
	// 먼저 서버에 사용자가 입력한 이메일을 서버에 보내서 인증번호를 받아옴
	$.ajax({
		url: '../../app/json/member/email',
		type: 'GET',
		data: {
			email : $("#email").val()
		},
		dataType: 'json',
		success: function (response) {

			// 요청이 성공하면 먼저 엘럿창을 띄움
		  Swal.fire({
        type: 'success',
        title: "이메일을 확인해주세요."
			})
			
			// 인증번호 입력창의 readonly를 해제
			$('#play').attr("readonly",false);
			$('#play').val('');

			// 기존 성공상태를 실패상태로 바꿈
			$('#play').removeClass("is-valid")
			.addClass("is-invalid")
			.show();

			$("#play").keyup(function(){
				var play=$(this).val();
				if(play == response.ranNo){
					$('#play').removeClass("is-invalid")
					.addClass("is-valid")
					.show();
				}else{
					$('#play').removeClass("is-valid")
					.addClass("is-invalid")
					.show();
				}
			});
		},
		fail: function (error) {
			alert('등록 실패!!');
		}
	});
})

// 버튼을 클릭했을때의 필수값 체크함수
function chkValue() {
	// 공통입력폼내의 모든 입력오브젝트
	var inputObjs = $("#signupForm .required");
	var focus;

	// 각 오브젝트에 대해 입력체크
	inputObjs.each(function(index, ele) {
		if (!$(ele).hasClass("is-valid")) {
			focus = $(ele);
			bEmpty = false;
			Swal.fire({
				type: 'error',
				title: $(ele).attr('data-name') + "은 필수 입력 사항입니다."
			}).then((result) =>{
				if(result.value){
					focus.focus();
				}	

			})
			return false;
		}
	});

	// 모든 값이 정상적으로 다들어 왔다면 서버에 요청을 보냄
	if ($('#name').hasClass("is-valid") &
	    $('#email').hasClass("is-valid") &
	    $('#play').hasClass("is-valid") &
	    $('#pwd').hasClass("is-valid") &
	    $('#rePwd').hasClass("is-valid") &
	    $('#fileupload').val() == ""){
	$.ajax({
		url: '../../app/json/member/add',
		type: 'POST',

		data: {
			email: $("#email").val(),
			password: $("#pwd").val(),
			name: $("#name").val(),
			auth: $("input[type=radio][name=customRadioInline1]:checked").val()
		},
		dataType: 'json',
		success: function(response) {

			if(response.status == 'success'){

				Swal.fire({
					type: 'success',
					title:"회원 가입을 환영 합니다!"
				}).then((result) =>{
					if(result.value){
						location.href='login.html'
					}	
				})
			} 
		},
		error: function(error) {
			alert('시스템 오류가 발생했습니다.');
		}
	});
} 
}

$('#btn1').on('click', function () {
	return chkValue()
  })
  
$('#file-btn1').on('click', function () {
  return filechkValue()
  })
	
	// 파일업로드를 눌렀을때의 필수값체크
  function filechkValue() {
  // 공통입력폼내의 모든 입력오브젝트
  var inputObjs = $("#signupForm .required");
  // 미입력여부(경우에 따라 사용)
  var bEmpty = true;
  var focus;
  // 각 오브젝트에 대해 입력체크
  inputObjs.each(function(index, ele) {
    if (!$(ele).hasClass("is-valid")) {
      focus = $(ele);
      bEmpty = false;
      Swal.fire({
        type: 'error',
        title: $(ele).attr('data-name') + "은 필수 입력 사항입니다."
      }).then((result) =>{
        if(result.value){
          focus.focus();
        } 
      })
      return false;
    }
  });
}
$('body').on('loaded-file', function () {
	$('#images-div').on('click', function () {
		$(this).find('img').remove();
		$('.custom-file').find('label').html('파일을 선택하세요')
		$('#btn1').show();
		$('p').hide();
		$('#file-btn1').hide();
	})
})


//성공 상태로 바꾸는 함수
function successState(sel) {
	$(sel)
	.removeClass("is-invalid")
	.addClass("is-valid")
	.show();

	$("#myForm button[type=submit]")
	.removeAttr("disabled");
};
//에러 상태로 바꾸는 함수
function errorState(sel) {
	$(sel)
	.removeClass("is-valid")
	.addClass("is-invalid")
	.show();

	$("#myForm button[type=submit]")
	.attr("disabled", "disabled");
};

"use strict"



//아이디 입력란에 keyup 이벤트가 일어 났을때 실행할 함수 등록 
//$("#name").keyup(function(){
////입력한 문자열을 읽어온다.
//var id=$(this).val();
////ajax 요청을 해서 서버에 전송한다.
//$.ajax({
//method:"post",
//url:"/idCheck",
//data:{inputId:id},
//success:function(data){
//var obj=JSON.parse(data);
//if(obj.canUse){//사용 가능한 아이디 라면 
//$("#overlapErr").hide();
////성공한 상태로 바꾸는 함수 호출
//successState("#name");

//}else{//사용 가능한 아이디가 아니라면 
//$("#overlapErr").show();
//errorState("#name");
//}
//}
//});
//});


