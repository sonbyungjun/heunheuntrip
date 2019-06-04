"use strict"
var no = 0;



$(document).ready(function () {
	$("#heun-header").load("/heunheuntrip/html/header.html", function () {
		$(".heun-header-nav").removeClass("navbar-over absolute-top");
	});
	$("#heun-footer").load("/heunheuntrip/html/footer.html");
})




function loadList() {
		$.getJSON('../../app/json/member/profile',
			function(obj) {

		console.log(obj);
		
	//	$(--------).appendTo(-------);
	  // 세션에서 로그인 사용자 정보를 가지고와서 뿌리자~ 
		$('.name').val(obj.name);
		$('.email').val(obj.email);
		$('.tel').val(obj.tel);
		no = obj.no;
	}); // Bitcamp.getJSON(

} // loadList()


//사용자의 프로필을 꺼낸다.
loadList();


//프로필 업데이트
$('.profile-update').on('click', function(e) {
	
	e.preventDefault();
	
	$.ajax({
		url: '../../app/json/member/updateprofile',
		type: 'POST',
		 data: {
	          name: $('.name').val(),
	          email: $('.email').val(),
	          tel: $('.tel').val(),
	          no: window.no},
		dataType: 'json',
		success: function (response) {
			if (response.status == 'success') {

				location.href = 'my_profile.html';

			} else {
				Swal.fire({
					type: 'error',
					title: '변경실패!',
					text: '프로필을 변경하지 못했습니다.'
				})
			}
		},
		fail: function (error) {
			alert('시스템 오류가 발생했습니다.');
		}
	});
	
})


 