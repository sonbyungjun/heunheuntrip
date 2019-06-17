//호스트 패스워드(host_passwrod) ,호스트  등록한 숙소(hostlist) 프로필 공통 메서드
function loadList() {
	$.getJSON('../../app/json/member/profile',
			  function(obj) {
    if (obj.member.photo != null) {
      $("<img class='rounded-circle'>").attr('src',
        '/heunheuntrip/app/json/images/down/' + obj.member.photo)
        .css('width', '255px')
        .css('height', '255px')
        .appendTo($('#profileimg'));
    } else {
      $("<img>").attr('src',
        '/heunheuntrip/app/json/images/down/defualt.jpeg')
        .css('width', '255px')
        .css('height', '255px')
        .appendTo($('#profileimg'));
    }
		  $('.main-name').text(obj.member.name);
		    $('.main-email').text(obj.member.email);
		    $('.main-tel').text(obj.member.tel);
		    $('.custom-file').find('label').html(obj.member.photo);
		    no = obj.member.no;
		   
		  //	$(--------).appendTo(-------);
		  // 세션에서 로그인 사용자 정보를 가지고와서 뿌리자~ 
	  }); // Bitcamp.getJSON(
  } // loadList()


//호스트 예약관리(hostReservation) ,호스트  리뷰(hostreview) 프로필 공통 메서드
function loadProfile() {
  $.getJSON('../../app/json/member/profile',
      function(obj) {
    
    if (obj.member.photo != null) {
      $("<img class='rounded-circle'>").attr('src',
        '/heunheuntrip/app/json/images/down/' + obj.member.photo)
        .css('width', '255px')
        .css('height', '255px')
        .appendTo($('#profileimg'));
    } else {
      $("<img>").attr('src',
        '/heunheuntrip/app/json/images/down/defualt.jpeg')
        .css('width', '255px')
        .css('height', '255px')
        .appendTo($('#profileimg'));
    }

    $('.main-name').text(obj.member.name);
    $('.main-email').text(obj.member.email);
    $('.main-tel').text(obj.member.tel);
    no = obj.member.no;
  });
} // loadProfile()




