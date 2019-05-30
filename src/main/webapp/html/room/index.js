var form = $('#room-list'),
	templateSrc = $('#list-template').html(),
	listGenerator = Handlebars.compile(templateSrc),
	paginateSrc = $('#page-template').html(),
	markers = [],
	img = {};

//handlebars에 paginate 함수를 추가한다.
Handlebars.registerHelper('paginate', paginate);
var pageGenerator = Handlebars.compile(paginateSrc);

$(document).ready(function () {
	$('#toggle-filters').sidr({
		side: 'left',
		displace: false,
		renaming: false,
		name: 'sidebar',
		source: function () {
			AOS.refresh();
		},
	});

	$('#heun-header').load('../header.html', function () {
		$('.heun-header-nav').removeClass('navbar-over absolute-top');
	})
	$('#heun-footer').load('../footer.html')

	loadList(0);

});

function loadList(pn) {
	$.ajax({
		url: '../../app/json/room/list?pageNo=' + pn,
		type: 'GET',
		dataType: 'json',
		success: function (response) {

			for (r of response.list) {
				r.price = comma(String(r.price).replace(/[^0-9]/g, ''));
			}

			response.pagination = {
				page: response.pageNo,
				pageCount: response.totalPage
			};

			form.html('');

			$(listGenerator(response)).appendTo(form);

			$('.pagination-menu').html('');

			$(pageGenerator(response)).appendTo('.pagination-menu');

			$(document.body).trigger('loaded-list');

		},
		fail: function (error) {
			alert('시스템 오류가 발생했습니다.');
		}
	});
}

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	mapOption = {
		center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 5 // 지도의 확대 레벨
	};

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

function panTo(latitude, longitude) {
	// 이동할 위도 경도 위치를 생성합니다 
	var moveLatLon = new daum.maps.LatLng(latitude, longitude);
	// 지도 중심을 부드럽게 이동시킵니다
	// 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
	map.panTo(moveLatLon);
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

$('body').on('loaded-list', function () {

	$('.heun-room').mouseenter(function () {
		
		
		$(img).css('border', '');

		img = $(this);

		img.css('border', '2px solid #eee');

		var latitude = $(this).data('latitude');
		var longitude = $(this).data('longitude');

		// 마커가 표시될 위치입니다 
		var markerPosition = new daum.maps.LatLng(latitude, longitude);

		// 마커를 생성합니다
		var marker = new daum.maps.Marker({
			position: markerPosition
		});

		// 기존 마커를 지운다.
		markers.forEach(function(e) {
			e.setMap(null);
		})

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);

		// 마커를 배열에 저장한다.		
		markers.push(marker);

		panTo(latitude, longitude);
	})

})