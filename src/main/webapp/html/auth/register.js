$(document).ready(function () {
	$("#heun-header").load("/heunheuntrip/html/header.html", function () {
		$(".heun-header-nav").removeClass("navbar-over absolute-top");
	});
	$("#heun-footer").load("/heunheuntrip/html/footer.html");
})

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

$("#name").keyup(function(){
	var name=$(this).val();

	var reg=/^([가-힣]{1,5}|[a-zA-Z]{1,30})$/;
	if(reg.test(name)){//정규표현식을 통과 한다면
		$("#nameErr").hide();
		successState("#name");
	}else{//정규표현식을 통과하지 못하면
		$("#nameErr").show();
		errorState("#name");
	}
});




$("#pwd").keyup(function(){
	var pwd=$(this).val();
	// 비밀번호 검증할 정규 표현식
	var reg=/^([0-9a-zA-Z_~!@#$%^&*()_+|<>?:{}]){8,16}$/;
	if(reg.test(pwd)){//정규표현식을 통과 한다면
		$("#pwdRegErr").hide();
		successState("#pwd");
	}else{//정규표현식을 통과하지 못하면
		$("#pwdRegErr").show();
		errorState("#pwd");
	}
});
$("#rePwd").keyup(function(){
	var rePwd=$(this).val();
	var pwd=$("#pwd").val();
	// 비밀번호 같은지 확인
	if(rePwd==pwd){//비밀번호 같다면
		$("#rePwdErr").hide();
		successState("#rePwd");
	}else{//비밀번호 다르다면
		$("#rePwdErr").show();
		errorState("#rePwd");
	}
});
$("#email").keyup(function(){
	var email=$(this).val();
	// 이메일 검증할 정규 표현식
	var reg=/^[A-Za-z0-9_\.\-]+@[A-Za-z\-]+\.[A-Za-z\-]{2,8}$/;
	if(reg.test(email)){//정규표현식을 통과 한다면
		$.getJSON('../../app/json/member/list',
				function (obj){
			for(emailcheck of obj.list){
				if(emailcheck.email != email){
					$("#emailErr").hide();
					successState("#email");
				}else{
					errorState("#email");
					Swal.fire({
						type: 'error',
						title: '이메일 중복입니다. 다시 입력해주세요'});
					break;
				}
			}
		});
	}else{//정규표현식을 통과하지 못하면
		$("#emailErr").show();
		errorState("#email");
	}
});

function chkValue() {
    // 공통입력폼내의 모든 입력오브젝트
    var inputObjs = $("#signupForm .required");
    // 미입력여부(경우에 따라 사용)
    var bEmpty = true;
    var focus;
 
    // 각 오브젝트에 대해 입력체크
    inputObjs.each(function(index) {
        if ($(this).val() == '') {
            focus = $(this);
            bEmpty = false;
            Swal.fire({
                type: 'error',
                title: $(this).attr('data-name') + "은 필수 입력사항입니다."});
               
           setTimeout(function(){focus.focus();},5000);
           return false;
        }
    });
 
    // 필수입력사항에 누락이 있으면 진행금지

}

$('.button').on('click',function(){
		return chkValue()
})










//성공 상태로 바꾸는 함수
function successState(sel){
	$(sel)
	.removeClass("is-invalid")
	.addClass("is-valid")
	.show();

	$("#myForm button[type=submit]")
	.removeAttr("disabled");
};
//에러 상태로 바꾸는 함수
function errorState(sel){
	$(sel)
	.removeClass("is-valid")
	.addClass("is-invalid")
	.show();

	$("#myForm button[type=submit]")
	.attr("disabled","disabled");
};

"use strict"

$('#fileupload').fileupload({
	url: 'upload.jsp',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
		previewMaxWidth: 100,   // 미리보기 이미지 너비
		previewMaxHeight: 100,  // 미리보기 이미지 높이 
		previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
		processalways: function(e, data) {
			console.log('fileuploadprocessalways()...');
			console.log(data.files);
			var imagesDiv = $('#images-div');
			imagesDiv.html("");
			for (var i = 0; i < data.files.length; i++) {
				try {
					console.log(data.files[i].preview.toDataURL());
					if (data.files[i].preview.toDataURL) {
						$("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '100px').appendTo(imagesDiv);
					}
				} catch (err) {}
			}
			$('#upload-btn').unbind("click");
			$('#upload-btn').click(function() {
				data.submit();
			});
		}, 
		submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
			console.log('submit()...');
			data.formData = {
					name: $('#name').val(),
					age: $('#age').val()
			};
		}, 
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data.result);
			$('<p/>').text("name : " + data.result.name).appendTo(document.body);
			$('<p/>').text("age : " + data.result.age).appendTo(document.body);
			$.each(data.result.files, function(index, file) {
				$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
			});
		}
});




