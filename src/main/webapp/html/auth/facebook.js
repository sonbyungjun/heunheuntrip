function autoServerLogin(accessToken) {
  console.log(accessToken);
    $.getJSON('/heunheuntrip/app/json/auth/fblogin',{
      "accessToken": accessToken
    }, (data) => {
      location.href = '../index.html'
    });
}

function checkLoginState() {
    FB.getLoginStatus(function(response) { 
        if (response.status === 'connected') { // 로그인이 정상적으로 되었을 때,
          console.log('왓?');
            autoServerLogin(response.authResponse.accessToken);
        
        } else { // 로그인이 되지 않았을 때,
            alert("페이스북 로그인 실패!");
        }
    });
}

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '428957764565592',
      cookie     : true,  
      xfbml      : true,  
      version    : 'v3.3' 
    });
  };
 
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  
  

//	    FB.api('/me?fields=id,name,email', function(response) {
	    	// var email = response.name,
	    	// 	name = response.email
	    	// login(name,email)
//	    });
  

//function login(email, name) {
//	$.post('/heunheuntrip/app/json/auth/snslogin', {
//		email: email,
//		sns_no: 3
//	},
//		function (data) {
//			if (data.status == 'success') {
//				location.href = '../index.html'
//			} else if (data.status == 'accessTokenFail') {
//				alert('올바르지 않는 접근이다')
//				location.href = '../index.html'
//
//			} else {
//				signup(email, name);
//			}
//		})
//}
//function signup(email, name) {
//	$.post('/heunheuntrip/app/json/member/snsadd', {
//		email: email,
//		name: name,
//		auth: 1,
//		sns_no: 3
//	},
//		function (data) {
//			if (data.status == 'fail') {
//				alert('계정생성오류')
//				location.href = '../index.html'
//			} else if (data.status == 'overlap') {
//				alert('이미 있는 계정입니다.')
//				location.href = '../index.html'
//			} else if (data.status == 'success') {
//				login(email, name)
//			}
//		})