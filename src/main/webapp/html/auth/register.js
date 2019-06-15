var auth = 0;
$(document).ready(function () {
	$("#heun-header").load("/heunheuntrip/html/header.html", function () {
		$(".heun-header-nav").removeClass("navbar-over absolute-top");
	});
	$('#file-btn1').hide();
	$('p').hide();
	$("#heun-footer").load("/heunheuntrip/html/footer.html");
	$(document.body).trigger('bankcheck');
	$('#host').hide();

	Swal.fire({
		title: '잠깐!',
		text: "회원을 선택해주세요",
		type: 'question',
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '일반회원',
		cancelButtonText: '호스트'
	}).then((result) => {
		if (result.value) {
			window.auth = 1;
			$('#host').hide();
			
		} else {
			window.auth = 2;
			$('#host').show();
		}
	})
})

$("#name").keyup(function () {
	var name = $(this).val();
	var reg = /^([가-힣]{1,5}|[a-zA-Z]{1,30})$/;
	if (reg.test(name)) {//정규표현식을 통과 한다면
		// 에러 메세지 숨김
		$("#nameErr").hide();
		// 체크표시 나오게
		successState("#name");
	} else {//정규표현식을 통과하지 못하면
		// 에러 메세지 출력
		$("#nameErr").show();
		// 엑스표시 나오게
		errorState("#name");
	} // 조건문 종료
}); // name 키업 종료

$("#pwd").keyup(function () {
	var pwd = $(this).val();
	var rePwd = $("#rePwd").val();
	// 비밀번호 검증할 정규 표현식
	var reg = /^([0-9a-zA-Z_~!@#$%^&*()_+|<>?:{}]){8,16}$/;

	if (reg.test(pwd)) {//정규표현식을 통과 한다면
		console.log("첫번째 조건")
		$("#pwdRegErr").hide();
		successState("#pwd");

		if (pwd == rePwd) {
			console.log("첫번째 조건의 if")
			$("#rePwdErr").hide();
			successState("#rePwd");

		} else {
			console.log("첫번째 조건 else")
			$('#rePwdErr').show();
			errorState("#rePwd");
		}

	} else if (pwd != rePwd &
		!reg.test(pwd)) {
		console.log("두번째 조건")
		errorState("#rePwd");
		errorState("#pwd");
		$("#rePwdErr").show();
		$("#pwdRegErr").show();

	} else if (pwd == rePwd &
		reg.test(pwd)) {
		console.log("세번째 조건")
		successState("#rePwd");

	} else if (!reg.test(pwd)) {//정규표현식을 통과하지 못하면
		console.log("네번째 조건")
		$("#pwdRegErr").show();
		errorState("#pwd");
	} // 조건문 종료
}); // 비밀번호 키업 종료

$("#rePwd").keyup(function () {
	var rePwd = $(this).val();
	var pwd = $("#pwd").val();
	// 비밀번호 같은지 확인
	if (rePwd == pwd) {//비밀번호 같다면
		$("#rePwdErr").hide();
		successState("#rePwd");
	} else {//비밀번호 다르다면
		$("#rePwdErr").show();
		errorState("#rePwd");
	} // 조건문 종료
}); // 비밀번호 재확인 키업 종료

$("#email").keyup(function () {
	var email = $(this).val();
	// 이메일 검증할 정규 표현식
	var reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z\-]+\.[A-Za-z\-]{2,8}$/;

	if (reg.test(email)) {//정규표현식을 통과 한다면

		$.getJSON('../../app/json/member/list',
			function (obj) {
				for (emailcheck of obj.list) {
					if (emailcheck.email != email) {
						$("#emailErr").hide();
						successState("#email");
						$('#add-btn').removeAttr("disabled");

					} else {
						errorState("#email");
						Swal.fire({
							type: 'error',
							title: '이메일 중복입니다. 다시 입력해주세요'
						});
						$('#add-btn').attr("disabled", "disabled");
						break;
					}
				}
			})

	} else {//정규표현식을 통과하지 못하면
		$("#emailErr").show();
		errorState("#email");
	}
});

// 파일업로드를 선택했을때 버튼이 바뀌게 만듬
$("#fileupload").change(function (e) {
	// 기본 버튼을 숨김
	$('#btn1').hide();
	// 파일 전용 버튼을 나오게만듬 
	$('#file-btn1').show();
})

$('#check-btn').on('click', function () {

	// 먼저 서버에 사용자가 입력한 이메일을 서버에 보내서 인증번호를 받아옴
	$.ajax({
		url: '../../app/json/member/checkEmail',
		type: 'GET',
		data: {
			ranNo: $("#play").val()
		},
		dataType: 'json',
		success: function (response) {

			if (response.status == "success") {
				$('#play').removeClass("is-invalid")
					.addClass("is-valid")
					.show();

			} else {
				$('#play').removeClass("is-valid")
					.addClass("is-invalid")
					.show();
			}

		},
		fail: function (error) {
			alert('등록 실패!!');
		}
	});
})

// 인증 번호 보내기
$('#add-btn').on('click', function () {
	// 먼저 서버에 사용자가 입력한 이메일을 서버에 보내서 인증번호를 받아옴
	$.ajax({
		url: '../../app/json/member/email',
		type: 'GET',
		data: {
			email: $("#email").val()
		},
		dataType: 'json',
		success: function (response) {

			// 요청이 성공하면 먼저 엘럿창을 띄움
			Swal.fire({
				type: 'success',
				title: "이메일을 확인해주세요."
			})

			// 인증번호 입력창의 readonly를 해제
			$('#play').attr("readonly", false);
			$('#play').val('');
			$('#check-btn').show();

			// 기존 성공상태를 실패상태로 바꿈
			$('#play').removeClass("is-valid")
				.addClass("is-invalid")
				.show();
			$('#check-btn').removeAttr("disabled");
		},
		fail: function (error) {
			alert('등록 실패!!');
		}
	});
})

$('#btn1').on('click', function () {
	return chkValue()
})

$('#file-btn1').on('click', function () {
	return filechkValue()
})

// 버튼을 클릭했을때의 필수값 체크함수
function chkValue() {
	// 공통입력폼내의 모든 입력오브젝트
	var inputObjs = $("#signupForm .required");
	var focus;

	// 각 오브젝트에 대해 입력체크
	inputObjs.each(function (index, ele) {

		if (!$(ele).hasClass("is-valid")) {
			focus = $(ele);
			bEmpty = false;
			Swal.fire({
				type: 'error',
				title: $(ele).attr('data-name') + "은 필수 입력 사항입니다."
			}).then((result) => {
				if (result.value) {
					focus.focus();
				}
			})
			return false;
		}
	});

	if (window.auth == '2' && $('#bnk_no').val() == '') {
		Swal.fire({
			type: 'error',
			title: "계좌번호는 필수 입력 사항입니다."
		})
		// 모든 값이 정상적으로 다들어 왔다면 서버에 요청을 보냄

	} else if ($('#name').hasClass("is-valid") &
		$('#email').hasClass("is-valid") &
		$('#play').hasClass("is-valid") &
		$('#pwd').hasClass("is-valid") &
		$('#rePwd').hasClass("is-valid") &
		window.auth == '1' &
		$('#fileupload').val() == "") {
		memberadd() // add ajax요청을 보냄

	} else if ($('#name').hasClass("is-valid") &
		$('#email').hasClass("is-valid") &
		$('#play').hasClass("is-valid") &
		$('#pwd').hasClass("is-valid") &
		$('#rePwd').hasClass("is-valid") &
		window.auth == '2' &
		$('#fileupload').val() == "") {

		memberadd() // add ajax요청을 보냄
	}
}

// 파일업로드를 눌렀을때의 필수값체크
function filechkValue() {
	// 공통입력폼내의 모든 입력오브젝트
	var inputObjs = $("#signupForm .required");
	// 미입력여부(경우에 따라 사용)
	var bEmpty = true;
	var focus;
	// 각 오브젝트에 대해 입력체크

	inputObjs.each(function (index, ele) {

		if (!$(ele).hasClass("is-valid")) {
			focus = $(ele);
			bEmpty = false;
			Swal.fire({
				type: 'error',
				title: $(ele).attr('data-name') + "은 필수 입력 사항입니다."
			}).then((result) => {
				if (result.value) {
					focus.focus();
				}
			})
			return false;
		}

		if (window.auth == '2' && $('#bnk_no').val() == '') {
			Swal.fire({
				type: 'error',
				title: "계좌번호는 필수 입력 사항입니다."
			})
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

$('#fileupload').fileupload({
	url: '../../app/json/member/add',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.  
	autoUpload: false,
	previewMaxWidth: 100,   // 미리보기 이미지 너비
	previewMaxHeight: 100,  // 미리보기 이미지 높이 
	previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
	processalways: function (e, data) {

		var imagesDiv = $('#images-div');
		imagesDiv.html("");

		for (var i = 0; i < data.files.length; i++) {

			try {
				if (data.files[i].preview.toDataURL) {
					$("<img>").attr('src',
						data.files[i].preview.toDataURL())
						.css('width', '100px')
						.appendTo(imagesDiv);
					$('p').show();
					// 자신이 선택한 파일 이름이 나오게 만듬
					$('.custom-file').find('label').html(data.files[i].name)
				}

			} catch (err) { }
		}
		$(document.body).trigger('loaded-file');
		$('#file-btn1').unbind("click");
		$('#file-btn1').click(function () {
			
			// 파일버튼을 클릭했을때 필수값들의 다 들어오면 submit을 호출한다.
			if ($('#name').hasClass("is-valid") &
				$('#email').hasClass("is-valid") &
				$('#play').hasClass("is-valid") &
				$('#pwd').hasClass("is-valid") &
				$('#rePwd').hasClass("is-valid") &
				$('#bnk_no').val() != '' &
				window.auth == '2' &
				typeof $('img').attr('src') == 'string') {
				data.submit();
				
			} else if ($('#name').hasClass("is-valid") &
				$('#email').hasClass("is-valid") &
				$('#play').hasClass("is-valid") &
				$('#pwd').hasClass("is-valid") &
				$('#rePwd').hasClass("is-valid") &
				window.auth == '1' &
				typeof $('img').attr('src') == 'string') {
				data.submit();

			} else {
				return filechkValue();
			}
		});
	},
	done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.

		$.each(data.result.files, function (index, file) {
			$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
		});

		Swal.fire({
			type: 'success',
			title: "회원 가입을 환영 합니다!"
		}).then((result) => {
			if (result.value) {
				location.href = 'signin.html'
			}
		})
	},
	submit: function (e, data) { // submit 이벤트가 발생했을 때 호출됨. 서버에 전송하기 전에 호출됨.
		// data 객체의 formData 프로퍼티에 일반 파라미터 값을 설정한다.
		data.formData = {
			email: $("#email").val(),
			password: $("#pwd").val(),
			name: $("#name").val(),
			bank: $('.dropdown-toggle').html(),
			bnk_no: $('#bnk_no').val(),
			auth: window.auth,
			sns_no: 0

		};
	}
}); //fileupload

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

$(document.body).on('bankcheck', function () {
	$('.dropdown-menu > a').on('click', function () {
		$('.dropdown-toggle').html($(this).html());
	});
})

function banknumber(event) {

	if (event.keyCode > 47 && event.keyCode < 58 || event.keyCode === 8) {
		event.returnValue = true;

	} else {
		event.returnValue = false;
	}
}

function memberadd() {
	$.ajax({
		url: '../../app/json/member/add',
		type: 'POST',
		data: {
			email: $("#email").val(),
			password: $("#pwd").val(),
			name: $("#name").val(),
			bank: $('.dropdown-toggle').html(),
			bnk_no: $('#bnk_no').val(),
			auth: window.auth,
			ranNo: $("#play").val(),
			sns_no: 0
		},
		dataType: 'json',
		success: function (response) {

			if (response.status == 'success') {

				Swal.fire({
					type: 'success',
					title: "회원 가입을 환영 합니다!"
				}).then((result) => {
					if (result.value) {
						location.href = 'signin.html'
					}
				})
				
			} else {
				alert("정보를 다시 확인해주세요")
			}
		},
		error: function (error) {
			alert('시스템 오류가 발생했습니다.');
		}
	});
}





