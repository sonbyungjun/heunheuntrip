var param = location.href.split('?')[1],
    form = $('#heun-detail'),
    templateSrc = $('#detail-template').html(),
    listGenerator = Handlebars.compile(templateSrc),
    no = '';

if (param) {
  pageload(param.split('=')[1]);
}

$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");


});


function pageload(no) {
  $.ajax({
    url: '../../app/json/room/detail?no=' + no,
    type: 'GET',
    dataType: 'json',
    success: function (response) {

      var places = new daum.maps.services.Places();
      places.keywordSearch(response.address + '명소', function(result, status) {
        if (status === daum.maps.services.Status.OK) {
          for (var r of result) {
            console.log(r)
            console.log(r.x, r.y);
          }
        }
      });
      
      var com = comma(String(response.price).replace(/[^0-9]/g, ''));
      response.price = com;

      response.content = tagParse(response.content.split('\n'));

      if (response.details) {
        response.details = tagParse(response.details.split('\n'));
        response.isDetails = true;
      } else {
        response.isDetails = false;
      }

      if (response.reservation) {
        response.reservation = tagParse(response.reservation.split('\n'));
        response.isReservation = true;
      } else {
        response.isReservation = false;
      }

      if (response.welcome){
        response.welcome = tagParse(response.welcome.split('\n'));
        response.isWelcome = true;
      } else {
        response.isWelcome = false;
      }

      if (response.traffic){
        response.traffic = tagParse(response.traffic.split('\n'));
        response.isTraffic = true;
      } else {
        response.isTraffic = false;
      }

      form.html('');
      
      $(listGenerator(response)).appendTo(form);
      
      $('body').trigger('loaded-list');
      
    },
    fail: function (error) {
      alert('시스템 오류가 발생했습니다.');
    }
  });
}

function tagParse(arr) {
  var content = '';
  for (var c of arr) {
    if (c.length > 0) {
      c = '<p>'.concat(c);
      c = c.concat('</p>');
      content += c;
    }
  }
  return content;
}

//콤마찍기
function comma(x) {
	var temp = "";

	num_len = x.length;
	// 콤마 찍을 자릿수 설정
	co = 3;
	// 받은 숫자 길이가 0개 이상일때 까지 반복. 즉 한번씩
	while (num_len > 0) {
		// 받은 숫자 길이에 콤마 찍을 자릿수 뺀다 
		num_len = num_len - co;
		// 뺀 길이가 음수면 
		if (num_len < 0) {
			// 콤마 찍을 자릿수 + 받은 자릿수
			co = num_len + co;
			// 받은 자릿수 0 으로 초기화
			num_len = 0;
		}
		// 자릿수 계산하여 temp의 담는다
		temp = "," + x.substr(num_len, co) + temp;
	}
	// 리턴 하기전에 맨 앞 ","를 뺀 나머지 리턴
	return temp.substr(1);
}