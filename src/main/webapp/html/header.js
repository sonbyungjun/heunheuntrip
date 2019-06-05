$(document).ready(function () {
  $('#logout-btn').on('click', function(e){
    $.ajax({
      url: '/heunheuntrip/app/json/auth/logout',
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        location.href='/heunheuntrip/html/auth/signin.html'
      },
      error: function (error) {
      }
    })
  });
})

$('.heun-myPage').on('click', function(e){
  e.preventDefault();

  $.ajax({
    url: '/heunheuntrip/app/json/auth/authCheck',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      
      if(response.auth == "일반회원"){
        location.href='/heunheuntrip/html/member/my_profile.html';
      } else if(response.auth == "호스트"){
        location.href='/heunheuntrip/html/member/host_profile.html';
      } else if(response.auth == "관리자"){
        location.href='/heunheuntrip/html/member/manager_profile.html';
      } else if (response.status == "fail"){
        location.href='/heunheuntrip/html/auth/signin.html';
      }
    },
    error: function (error) {
    }
  })
})

$('#heun-header-search').submit(function() {
  search($('#heun-search-val').val());
  return false;
});

loadLoginUser();

function search(val) {
  var places = new daum.maps.services.Places();
  places.keywordSearch(val, function(result, status) {
    if (status === daum.maps.services.Status.OK) {
      location.href = '/heunheuntrip/html/room/index.html?lati=' + result[0].y + '&longi=' + result[0].x;
    }
  });
}

////header.html을 로딩하고 초기화시킨다.
////헤더 가져오기
////(function () {
////var header = document.querySelector('.bit-main-header');
////var xhr = new XMLHttpRequest()
////xhr.onreadystatechange = function() {
////if (xhr.readyState != 4 || xhr.status != 200)
////return;
////header.innerHTML = xhr.responseText

////// body 태그 쪽에 헤더 로딩 완료 이벤트를 보낸다.
////var e = new Event('loaded.header');
////document.body.dispatchEvent(e);
////};
////xhr.open('GET', '/java-web-project/html/header.html', true)
////xhr.send()
////})();

////header.html의 내용을 웹 페이지에 삽입했다고 연락이 오면,
////즉시 로그아웃 버튼에 click listener를 등록한다.
////header.html이 삽입되지도 않았는데 로그아웃 버튼을 찾아서는 안된다.

//$('body').on('loaded.list', () => {
//console.log('sdf')

// 웹 페이지에 header.html을 삽입했으면 로그인 정보를 가져와 설정한다.


//// 로그아웃 버튼의 click 리스너를 등록한다.
//document.querySelector('#logout-menu').addEventListener('click', (e) => {
//e.preventDefault();
//var xhr = new XMLHttpRequest()
//xhr.onreadystatechange = function() {
//if (xhr.readyState != 4 || xhr.status != 200)
//return;

//location.href = '/java-web-project/html/index.html';

//};
//xhr.open('GET', '/java-web-project/app/json/auth/logout', true)
//xhr.send()
//});
//});

//header.html이 웹 페이지에 삽입된 후 로그인 정보를 받아온다. 



function loadLoginUser() {
  var logoutState = $('#logout-btn'),
  LoginState = $('#login-btn');
  $.ajax({
    url: '/heunheuntrip/app/json/auth/user',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      if (response.status == 'success'){
        $('#login-btn').hide();
        $('#login-username').append(response.user.name +"님");
        $('#login-userphoto').css('background-image', "url('/heunheuntrip/html/memberupload/" + response.user.photo + "')");
      } else {
        $('#login-btn').show();
        $('#logout-btn').hide();
      }
    },
    error: function (error) {
    }
  });

}








