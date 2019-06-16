$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");
	loadList();
})
"use strict"

$("#n-pwd").keyup(function(){
	var pwd=$(this).val();
	var rePwd = $("#n-pwd-ck").val();
	// 비밀번호 검증할 정규 표현식
	var reg = /^([0-9a-zA-Z_~!@#$%^&*()_+|<>?:{}]){8,16}$/;
	if (reg.test(pwd)) {//정규표현식을 통과 한다면
		$("#pwdRegErr").hide();
		successState("#n-pwd");
		if(pwd != rePwd){
			errorState("#n-pwd-ck");
		}else{
			$("#rePwdErr").hide();
			successState("#n-pwd-ck");
		}
	} else if(!reg.test(pwd) & pwd != rePwd){
		errorState("#n-pwd-ck");
		errorState("#n-pwd");
		$("#pwdRegErr").show();
	}else if (rePwd != pwd) {
		errorState("#n-pwd-ck");
	} else {//정규표현식을 통과하지 못하면
		$("#pwdRegErr").show();
		errorState("#n-pwd");
	}
});

$("#n-pwd-ck").keyup(function () {
	var rePwd = $(this).val();
	var pwd = $("#n-pwd").val();
	// 비밀번호 같은지 확인
	if (rePwd == pwd) {//비밀번호 같다면
		$("#rePwdErr").hide();
		successState("#n-pwd-ck");
	} else {//비밀번호 다르다면
		$("#rePwdErr").show();
		errorState("#n-pwd-ck");
	}
});

function chkValue() {
	// 공통입력폼내의 모든 입력오브젝트
	var inputObjs = $("#signupForm .required");
	var focus;
	if ($("#n-pwd-ck").hasClass('is-valid') &
		!$("#n-pwd").hasClass('is-valid')){
		Swal.fire({
			type: 'error',
			title: "새 비밀번호를 입력해주세요."
		})
	} else if (!$("#n-pwd-ck").hasClass('is-valid') &
		$("#n-pwd").hasClass('is-valid')){
		Swal.fire({
			type: 'error',
			title: "새 비밀번호를 확인해주세요"
		})
	} else if (!$("#n-pwd-ck").hasClass('is-valid') &
			!$("#n-pwd").hasClass('is-valid')){
			Swal.fire({
				type: 'error',
				title: "새 비밀번호를 입력 해주세요"
			})
	} else if ($("#n-pwd-ck").hasClass('is-valid') &
			$("#n-pwd").hasClass('is-valid')){
		
		$.ajax({
			url: '../../app/json/auth/user',
			type: 'GET',
			dataType: 'json',
			success: function(response) {

				if(response.status == 'success'){
					$.ajax({
						url:'../../app/json/member/updatepwd',
						type:'POST',
						data:{
							no: response.user.no,
							password: $("#n-pwd").val()
						},
						dataType: 'json',
						success: function(response) {
							Swal.fire({
								type: 'success',
								title:"비밀번호 변경이 완료 되었습니다!"
							}).then((result) =>{
								if(result.value){
								  $.ajax({
								    url:'../../app/json/auth/logout',
								    type:'GET',
								    dataType:'json'
								  })
									location.href='/heunheuntrip/html/auth/signin.html'
								}	
							});// alert창
						}//success
					})// ajax 요청
					
				} // if문 
			}, //ajax 유저정보요청 sucess 
			error: function(error) {
				alert('시스템 오류가 발생했습니다.');
			}
		});
	}
	}

	$('#btn1').on('click', function () {
		return chkValue()
	  })

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

//function loadList() {
//	$.getJSON('../../app/json/member/profile',
//			  function(obj) {
//    if (obj.member.photo != null) {
//      $("<img class='rounded-circle'>").attr('src',
//        '/heunheuntrip/app/json/images/down/' + obj.member.photo)
//        .css('width', '255px')
//        .css('height', '255px')
//        .appendTo($('#profileimg'));
//    } else {
//      $("<img>").attr('src',
//        '/heunheuntrip/app/json/images/down/defualt.jpeg')
//        .css('width', '255px')
//        .css('height', '255px')
//        .appendTo($('#profileimg'));
//    }
//		  $('.main-name').text(obj.member.name);
//		    $('.main-email').text(" E-MAIL : " + obj.member.email);
//		    $('.main-tel').text(" PHONE : " + obj.member.tel);
//		    $('.custom-file').find('label').html(obj.member.photo);
//		    no = obj.member.no;
//		  //	$(--------).appendTo(-------);
//		  // 세션에서 로그인 사용자 정보를 가지고와서 뿌리자~ 
//	  }); // Bitcamp.getJSON(
//	
//  
//  } // loadList()


//$('.udatepwd-btn').on('click', function(e) {
//	
//	e.preventDefault();
//	
//	$.ajax({
//		url: '../../app/json/member/updatepwd',
//		type: 'POST',
//		 data: {
//	          password: $('.pwd').val()
//	          },
//		dataType: 'json',
//		success: function (response) {
//			if (response.status == 'success') {
//				location.href = 'host_profile.html';
//			} else {
//				Swal.fire({
//					type: 'error',
//					title: '변경실패!',
//					text: '프로필을 변경하지 못했습니다.'
//				})
//			}
//		},
//		fail: function (error) {
//			alert('비밀번호가 일치하지 않습니다.');
//		}
//	});
//})
 


