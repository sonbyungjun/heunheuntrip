var latitude = '';
var longitude = '';

$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");

  $('#fullpage').fullpage({
    //options here 
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling: false,
    navigationPosition: 'right',
    scrollHorizontally: false,
    loopHorizontal: false,
    controlArrows: false
  });

});

$('.heun-form-next').click(function () {
  fullpage_api.moveSlideRight();
})

$('.heun-form-prev').click(function () {
  fullpage_api.moveSlideLeft();
})


$('#post-search').click(function () {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById("extraAddress").value = extraAddr;

      } else {
        document.getElementById("extraAddress").value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('postcode').value = data.zonecode;
      document.getElementById("address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("detailAddress").focus();
    }
  }).open();
})



$('.heun-push').click(function () {

  var address = $('#address').val();

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new daum.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(address , function (result, status) {
    // 정상적으로 검색이 완료됐으면 
    if (status === daum.maps.services.Status.OK) {
      window.latitude = result[0].y;
      window.longitude = result[0].x;
      $('body').trigger('xy');
    }
  });

  var convenience = [];
  $("input[name=convenience]:checked").each(function () {
    convenience.push($(this).val());
  })

  var safety = [];
  $("input[name=safety]:checked").each(function () {
    safety.push($(this).val());
  })

  $('body').on('xy', function() {
    var allData = {
      type: $('#type').val(),
      maxPerson: $('#maxp').val(),
      area: $('#area').val(),
      bed: $('#bed').val(),
      bath: $('#bath').val(),
      postcode: $('#postcode').val(),
      address: address,
      detailAddress: $('#detailAddress').val(),
      content: $('#contents').val(),
      details: $('#details').val(),
      reservation: $('#reservation').val(),
      welcome: $('#welcome').val(),
      traffic: $('#traffic').val(),
      name: $('#heun-name').val(),
      price: $('#heun-price').val(),
      latitude : window.latitude,
      longitude : window.longitude,
      convenience: convenience,
      safety: safety
    }
  
    $.ajax({
      url: '../../app/json/room/add',
      type: 'POST',
      data: allData,
      dataType: 'json',
      success: function (response) {
        if (response.status == 'success') {
          location.href = 'form.html';
        } else {
        }
      },
      fail: function (error) {
        alert('시스템 오류가 발생했습니다.');
      }
    });
  
    // 'curl -v -X GET "https://dapi.kakao.com/v2/local/search/address.json" \
    // --data-urlencode "query=위례동로 61" \
    // -H "Authorization: KakaoAK a1cc855a6e6b544dbcdff510261d5c17"'
  
    console.log('타입 : ' + $('#type').val())
    console.log('최대숙박인원 : ' + $('#maxp').val())
    console.log('지역명 : ' + $('#area').val())
    console.log('침대갯수 : ' + $('#bed').val())
    console.log('욕실갯수 : ' + $('#bath').val())
    console.log('우편번호 : ' + $('#postcode').val())
    console.log('기본주소 : ' + $('#address').val() + ' ' + $('#extraAddress').val())
    console.log('상세주소 : ' + $('#detailAddress').val())
  
    var result = '';
    $("input[name=convenience]:checked").each(function () {
      result += $(this).val() + ' ';
    })
    console.log('편의시설목록 : ' + result);
  
    result = '';
    $("input[name=safety]:checked").each(function () {
      result += $(this).val() + ' ';
    })
    console.log('편의시설목록 : ' + result);
  
    console.log('숙소설명 : ' + $('#contents').val())
    console.log('숙소세부정보 : ' + $('#details').val())
    console.log('예약가능여부 : ' + $('#reservation').val())
    console.log('숙소가위치한지역 : ' + $('#welcome').val())
    console.log('교통편 : ' + $('#traffic').val())
    console.log('숙소이름 : ' + $('#heun-name').val())
    console.log('숙소가격 : ' + $('#heun-price').val())
  
    console.log('위도 : ' + window.latitude);
    console.log('경도 : ' + window.longitude);
  
    var api = $.fileuploader.getInstance($('.gallery_media'));
    api.uploadStart();
  })
})