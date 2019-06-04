  function statusChangeCallback(response) {
	  console.log(response)
    if (response.status === 'connected') {
      testAPI();
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '428957764565592',
      cookie     : true,  
      xfbml      : true,  
      version    : 'v3.3' 
    });
 
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
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
  
  
  function testAPI() {
	    FB.api('/me?fields=id,name,email', function(response) {
	    	var email = response.name,
	    		name = response.email
	    	login(name,email)
	    });
	  }
  

function login(email, name) {
	$.post('/heunheuntrip/app/json/auth/snslogin', {
		email: email,
		sns_no: 3
	},
		function (data) {
			if (data.status == 'success') {
				location.href = '../index.html'
			} else if (data.status == 'accessTokenFail') {
				alert('올바르지 않는 접근이다')
				location.href = '../index.html'
'
			} else {
				signup(email, name);
			}
		})
}
function signup(email, name) {
	$.post('/heunheuntrip/app/json/member/snsadd', {
		email: email,
		name: name,
		auth: 1,
		sns_no: 3
	},
		function (data) {
			if (data.status == 'fail') {
				alert('계정생성오류')
				location.href = '../index.html'
			} else if (data.status == 'overlap') {
				alert('이미 있는 계정입니다.')
				location.href = '../index.html'
			} else if (data.status == 'success') {
				login(email, name)
			}
		})
}