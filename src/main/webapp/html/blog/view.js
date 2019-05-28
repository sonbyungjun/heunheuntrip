var param = location.href.split('?')[1];

 
$(document).ready(function () {
  $('#heun-header').load('../header.html', function () {
    $('.heun-header-nav').removeClass('navbar-over absolute-top');
  });

  $('#heun-footer').load('../footer.html', function () {
  });

  if (param) {
    loadData(param.split('=')[1])
  }

});

function loadData(no) {


  $.getJSON("../../app/json/blog/detail?no=" + no, function (data) {
    $('#no').attr('data-no', data.blog.no);
    $('#no').attr('data-title', data.blog.title);
    $('#name').html(data.blog.name);
    $('h1').html(data.blog.title);
    $('#cont').html(data.blog.content);
    $('.tooltip').attr('title', data.blog.rmsAddr + " " + data.blog.rmsDetailAddr);
    $('#createdDate').html(data.blog.createdDate);
    $('#rmsName').html("방문했던 게스트하우스 : " + data.blog.rmsName);
    $('#grade').html("평점 : " + data.blog.grade);

    if(data.loginNo != undefined){
      console.log('유저 로그인 한 상태임..');
      $('#no').attr('data-uno', data.loginNo);
      console.log($('#no').attr('data-uno')); 
    } else {
      console.log('유저 로그인 안 한 상태임..')
      $('.like-btn').hide();
    }

    // 이 게시글이 받은 좋아요 갯수
    console.log(data.count);

    if(data.blog.userNo != data.userNo){
      $('#delete-btn').hide();
      $('#update-btn').hide();
    }

    loadLike();

  }); // getJSON의 끝

}

  function loadLike() {
    

    console.log($('#no').attr('data-uno')); 
    console.log($('#no').attr('data-no')); 
    console.log($('#no').attr('data-title')); 
    // 글 조회 시 Like 할 수 있는 데이터 생김
  
    if($('#no').attr('data-uno') != undefined){

      console.log('여기로 안들어가져?');
      console.log($('#no').attr('data-uno'));
      
      $.ajax({
        url: '../../app/json/blog/checkView',
        type: 'POST',
        data: {
          userNo: $('#no').attr('data-uno'),      
          boardNo: $('#no').attr('data-no')
        },
        dataType: 'json',
        success: function(response) {
          console.log('like 데이터 생겼는지 확인 점 해바바');
        },
        fail: function(error) {
          alert('확인 실패!');
        }

      });


      // 좋아요를 눌렀을 시 하트가 활성화, 좋아요를 누른 적이 없으면 비 활성화
      $.ajax({
        url: '../../app/json/blog/checkBlike',
        type: 'POST',
        data: {
          userNo: $('#no').attr('data-uno'),      
          boardNo: $('#no').attr('data-no')
        },
        dataType: 'json',
        success: function(response) {

          if(response.blike == 0){
            $('.heart-btn').css("color", "white");
          } else if (response.blike == 1){
            $('.heart-btn').css("color", "red");
          }
        },
        fail: function(error){

        }
      });

      // like 버튼을 눌렀을 때 숫자 증가, 감소 + 하트 활성화, 비활성화
      $('.like-btn').on('click', function(){
        

        $.ajax({
          url: '../../app/json/blog/checkBlike',
          type: 'POST',
          data: {
            userNo: $('#no').attr('data-uno'),      
            boardNo: $('#no').attr('data-no')
          },
          dataType: 'json',
          success: function(response) {
            console.log(response);
            if(response.blike == 0){

              $.ajax({
                url: '../../app/json/blog/increaseLike',
                type: 'POST',
                data: {
                  userNo: $('#no').attr('data-uno'),      
                  boardNo: $('#no').attr('data-no')
                },
                dataType: 'json',
                success: function(response) {
                  $('.heart-btn').css("color", "red");
                  console.log('make sure increaseLike')
                },
                fail: function(error) {
                  alert('변경 실패!!');
                }
              });

            } else if (response.blike == 1) {

              $.ajax({
                url: '../../app/json/blog/decreaseLike',
                type: 'POST',
                data: {
                  userNo: $('#no').attr('data-uno'),      
                  boardNo: $('#no').attr('data-no')
                },
                dataType: 'json',
                success: function(response) {
                  $('.heart-btn').css("color", "white");
                  console.log('make sure decreaseLike')
                },
                fail: function(error) {
                  alert('변경 실패!!');
                }
              });
            }
          },
          fail: function(error) {
            alert('변경 실패!!');
          }
        });

      })

    }
  }




  $('#update-btn').on('click', function() {

    $('#add-btn').hide();

    $('h1').contents().unwrap().wrap( '<textarea id="update-title"></textarea>' );

    $('.update-content').contents().unwrap().wrap( '<div id="summernote"></div>' );

    $('#summernote').summernote({  //썸머노트 활성화 시작
      placeholder: 'Hello bootstrap 4',
      tabsize: 2,
      height: 400
    });

    if($('#delete-btn').css("display") != "none") {
      $('#delete-btn').css("display", "none");

    } else{
      updateDate();
    }

  });



  function updateDate() {
    var markupStr = $('#summernote').summernote('code');

    $.ajax({
      url: '../../app/json/blog/update',
      type: 'POST',
      data: {
        no: $('#no').attr('data-no'),      
        title: $('#update-title').val(),
        content: markupStr
      },
      dataType: 'json',
      success: function(response) {
        location.href = 'index.html';
      },
      fail: function(error) {
        alert('변경 실패!!');
      }
    });
  }



  $('#delete-btn').on('click', function () {

    $.ajax({
      url: '../../app/json/blog/delete?no=' + $('#no').attr('data-no'),
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        location.href = 'index.html';

      },
      fail: function (error) {
        alert('삭제 실패!!');
      }
    });
  });


