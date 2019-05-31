var naverLogin = new naver.LoginWithNaverId(
	{
		clientId: "9GsCl1_fOwukSDhiTmng",
		callbackUrl: "http://localhost:8080/heunheuntrip/html/auth/callback.html",
		isPopup: false,
		callbackHandle: true
		/* callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다. */
	}
);

/* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
naverLogin.init();

/* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup close) */
window.addEventListener('load', function () {
	naverLogin.getLoginStatus(function (status) {
		if (status) {
			/* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
			var email = naverLogin.user.getEmail(); // 네이버가 넘겨준 사용자 이메일
			var name = naverLogin.user.getName(); // 네이버가 넘겨준 사용자 이름
			var isRequire = true; // 필수값 체크여부

			if (name == 'undefined' || name == null || name == '') {
				alert('이름은 필수 정보입니다. 정보제공을 동의해주세요.');
				isRequire = false;
			} else if (email == 'undefined' || email == null || email == '') {
				alert('이메일은 필수 정보입니다. 정보제공을 동의해주세요.');
				isRequire = false;
			}
			if (isRequire == false) {
				naverLogin.reprompt(); // 필수정보를 얻지 못 했을 때 다시 정보제공 동의 화면으로 이동
				return;
			}
			$.post('/heunheuntrip/app/json/auth/snslogin', {
				email: email,
				sns_no: 1
			},
				function (data) {
					if (data.status == 'success') {
						location.href = "/heunheuntrip/html/index.html"
					} else {
						$.post('/heunheuntrip/app/json/member/snsadd', {
							email: email,
							name: name,
							auth: 1,
							sns_no: 1
						},
							function (data) {
								if (data.status == 'success') {
									$.post('/heunheuntrip/app/json/auth/snslogin', {
										email: email,
										sns_no: 1
									},
										function (data) {
											if (data.status == 'success') {
												location.href = "/heunheuntrip/html/index.html"
											} else {
												//  실패시 
											}
										})
								} else {
									alert(data.message);
								}
							});
					}
				});
			//window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port) + "/bitcamp-fit-tour/html/index.html");
		} else {
			console.log("callback 처리에 실패하였습니다.");
		}
	});
});