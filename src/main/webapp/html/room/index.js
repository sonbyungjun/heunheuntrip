var form = $('#room-list'),
		templateSrc = $('#list-template').html(),
		listGenerator = Handlebars.compile(templateSrc);

$(document).ready(function() {
	$('#toggle-filters').sidr({
		side: 'left',
		displace : false,
		renaming : false,
		name: 'sidebar',
		source: function() {
		  AOS.refresh();
		},
  });
  
  $('#heun-header').load('../header.html', function() {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  })
	$('#heun-footer').load('../footer.html')
	

	$.ajax({ 
		url: '../../app/json/room/list',
		type: 'GET',
		dataType: 'json',
		success: function (response) {

			console.log(response)

			for (r of response.list) {
				r.price = comma(String(r.price).replace(/[^0-9]/g, ''));
				console.log(r.price);
			}

			$(listGenerator(response)).appendTo(form);

			$(document.body).trigger('loaded-list');

		},
		fail: function (error) {
			alert('시스템 오류가 발생했습니다.');
		}
	});



});


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
