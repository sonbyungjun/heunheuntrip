$('#add-btn').on('click', function() {
  $.ajax({
    url: '../../app/json/faq/add',
    type: 'POST',
    data: {
      title: $('#title').val(),
      content: $('#content').val()
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

