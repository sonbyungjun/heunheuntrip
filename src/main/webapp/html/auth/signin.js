$(document).ready(function () {
	$("#heun-header").load("/heunheuntrip/html/header.html", function () {
		$(".heun-header-nav").removeClass("navbar-over absolute-top");
	});
	$("#heun-footer").load("/heunheuntrip/html/footer.html");
})



if (window.localStorage.getItem('email')) {
  document.querySelector('#email').value = localStorage.email;
}

document.querySelector('#login-btn').onclick = () => {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../../app/json/auth/login', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var email = document.querySelector('#email').value;
  var password = document.querySelector('#password').value;
  if (document.querySelector('#remember_me:checked') != null) {
	  localStorage.email = email;
  } else {
	  window.localStorage.removeItem('email');
  }
  var qs = 'email=' + email + '&password=' + password;
  xhr.send(qs);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200) 
      return;
    var data = JSON.parse(xhr.responseText);
    if (data.status == 'success') {
      location.href = '../index.html';
      
    } else {
    	Swal.fire({
			type: 'error',
			title:"없는 이메일이거나 비밀번호가 맞지 않습니다."	});
    }
  };
  
};
