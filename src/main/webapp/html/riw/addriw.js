$('#add-btn').on('click', function() {
  $.ajax({
    url: '../../app/json/riw/add',
    type: 'POST',
    data: {
      userNo: $('#userNo').val(),
      grd: $('#grd').val(),
      contents: $('#contents').val()
    },
    dataType: 'json',
    success: function(response) {
      location.href = 'index.html';
    },
    fail: function(error) {
      alert('등록 실패!!');
    }
  });
})

