var latitude = '';
var longitude = '';

var slideRule = [
  {
    id : 's1',
    ele : $('#s1'),
    rule : [
      {
        name : 'area',
        InputEle : $('#area'),
        Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
        message: '지역을 입력해주세요. \n(1자 이상 20자 이하)'
      }
    ]
  },
  {
    id : 's2',
    ele : $('#s2'),
    rule : [
      {
        name : 'bed',
        InputEle : $('#bed'),
        Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
        message: '침대 갯수를 선택해주세요.'
      },
      {
        name : 'bath',
        InputEle : $('#bath'),
        Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
        message: '욕실 갯수를 선택해주세요.'
      }
    ]
  },
  {
    id : 's3',
    ele : $('#s3'),
    rule : [
      {
        name: 'address',
        InputEle: $('#address'),
        Pattern: /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ -_]){1,20}$/,
        message: '주소를 입력해주세요.'
      },
      {
        name: 'detailAddress',
        InputEle: $('#detailAddress'),
        Pattern: /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
        message: '상세주소를 입력해주세요'
      }
    ]
  },
  {
    id : 's4',
    ele : $('#s4'),
    rule : [
      {
        name : 'convenience',
        InputEle : $('input[name=convenience]:checked'),
        Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
        message: '편의시설을 1개 이상 선택해주세요.'
      }
    ]
  },
  {
    id : 's5',
    ele : $('#s5'),
    rule : [
      {
        name : 'safety',
        InputEle : $('input[name=safety]:checked'),
        Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,}$/,
        message: '안전시설을 1개 이상 선택해주세요.'
      }
    ]
  },
  {
    id : 's7',
    ele : $('#s7'),
    rule : [
      {
        name : 'contents',
        InputEle : $('#contents'),
        Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){10,500}$/,
        message: '10자 이상 500자 이하로 작성해주세요!'
      }
    ]
  },
  {
    id : 's10',
    ele : $('#s10'),
    rule : [
      {
        name : 'heun-name',
        InputEle : $('#heun-name'),
        Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
        message: '1자 이상 20자 이하로 입력해주세요.'
      },{
        name : 'heun-price',
        InputEle : $('#heun-price'),
        Pattern : /^([0-9,]){1,20}$/,
        message: '숫자만 입력해주세요.'
      }
    ]
  }
]

$('#contents').keyup(function(e) {
  var content = $(this).val();
  $('.counter').html((500 - content.length) + ' 자');

  // textarea의 유효성 검사를 시행한다.
  var idAttr = $(this).attr('id');
  validKeyup($(this), idAttr);
});



// 다음 버튼을 눌렀을때 실행
$('.heun-form-next').click(function () {

  // 다음버튼을 누를때마다 해당 페이지에 대해 유효성 검사를 실시한다.
  var idAttr = $(this).closest('.slide').attr('id');
  if (!validNext(idAttr)) {
    return;
  }
  // 숙소사진 등록 페이지면 
  if ($(this).closest('.slide').attr('id') == 's6') {
    // 사진을 한개이상 등록했는지 체크한다.
    if (fileCountCheck) {
      Swal.fire({
        type: 'error',
        title: '숙소 사진은 반드시 \n한장 이상 등록해야 합니다',
      })
      return;
    }
  }

  // 숙소설명 입력 후 선택사항 페이지면
  if ($(this).closest('.slide').attr('id') == 's7') {
    // 선택사항을 입력할건지 창을 띄운다
    Swal.fire({
      title: '정보를 추가로 입력하시겠습니까?',
      text: "자세한 내용을 공유하려면 추가 필드를 작성해주세요.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      
    })
    
  }

  // 검사를 모두 통과하면 다음 페이지로 간다.
  fullpage_api.moveSlideRight();
})

function validNext(idAttr) {
  var nowSlide = {}
  for (var ele of slideRule) {
    if (ele.id === idAttr) {
      nowSlide = ele
      break
    }
  }

  var inputs = nowSlide.rule;
  var isEmpty = true;
  $(inputs).each(function(i, e) {
    console.log('체크할 값 : ' + e.InputEle.val())
    console.log('체크 참거짓 : ' + e.Pattern.test(e.InputEle.val()))
    if (!e.InputEle.val() || !e.Pattern.test(e.InputEle.val())) {

      Swal.fire({
        type: 'error',
        title: e.message,
      }).then((value) => {
          setTimeout(function() {
            e.InputEle.focus();
          }, 500)
        });

      e.InputEle.removeClass('is-valid');
      e.InputEle.addClass('is-invalid');

      isEmpty = false;
      return isEmpty;
    }
  })

  if (!isEmpty) {
    return false;
  }
  return true;
}


var rule = [
  {
    id: 'area',
    ele: $('#area'),
    Pattern: /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
    message: '1자 이상 20자 이하로 입력해주세요.'
  },
  {
    id: 'address',
    ele: $('#address'),
    Pattern: /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ -_]){1,20}$/,
    message: '주소를 입력해주세요.'
  },
  {
    id: 'detailAddress',
    ele: $('#detailAddress'),
    Pattern: /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
    message: '상세주소를 입력해주세요'
  },
  {
    id : 'contents',
    ele : $('#contents'),
    Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){10,500}$/,
    message: '10자 이상 500자 이하로 작성해주세요!'
  },
  {
    id : 'heun-name',
    ele : $('#heun-name'),
    Pattern : /^([0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ _]){1,20}$/,
    message: '1자 이상 20자 이하로 입력해주세요.'
  },
  {
    id : 'heun-price',
    ele : $('#heun-price'),
    Pattern : /^([0-9,]){1,20}$/,
    message: '숫자만 입력해주세요.'
  }
]

$('#heun-submit input').on('keyup', function () {
  var idAttr = $(this).attr('id')
  console.log(idAttr);
  validKeyup($(this), idAttr)
})

function validKeyup(self, idAttr) {
  var nowEle = {}
  for (var ele of rule) {
    if (ele.id === idAttr) {
      nowEle = ele
      break
    }
  }

  if (!nowEle.ele.val() || !nowEle.Pattern.test(nowEle.ele.val())) {
    self.removeClass('is-valid');
    self.addClass('is-invalid');
    return false
  } else {
    self.removeClass('is-invalid');
    self.addClass('is-valid');
    self.next('.invalid-feedback').html('')
  }
  return true
}


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
        $("#extraAddress").val(extraAddr);

      } else {
        $("#extraAddress").val('');
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      var addressEle = $("#address")
      $('#postcode').val(data.zonecode);
      addressEle.val(addr);
      addressEle.removeClass('is-invalid');
      addressEle.addClass('is-valid');

      // 커서를 상세주소 필드로 이동한다.
      $("#detailAddress").focus();
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

$("#heun-price").keypress(function (event) {
  //숫자만 받기
  if (event.which && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
  }
}).keyup(function () {
  if ($(this).val() != null && $(this).val() != '') {
      var text = $(this).val().replace(/[^0-9]/g, '');
      $(this).val(comma(text));
  }
});

//콤마찍기
function comma(x) {
var temp = "";

num_len = x.length;
co = 3;
while (num_len > 0) {
  num_len = num_len - co;
  if (num_len < 0) {
      co = num_len + co;
      num_len = 0;
  }
  temp = "," + x.substr(num_len, co) + temp;
}
return temp.substr(1);
}