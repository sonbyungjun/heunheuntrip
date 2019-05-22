var tbody = $('tbody'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    paginateSrc = $('#page-template').html();

//handlebars에 paginate 함수를 추가한다.
Handlebars.registerHelper('paginate', paginate);
var pageGenerator = Handlebars.compile(paginateSrc);

$(document).ready(function(){
    $('#heun-header').load('../header.html', function(){
        $('.heun-header-nav').removeClass('navbar-over absolute-top');
    });
    
    $('#heun-footer').load('../footer.html', function(){
    });
  })


//JSON 형식의 데이터 목록 가져오기
 function loadList(pn) {

  
  
    $.getJSON('../../app/json/qna/list?pageNo=' + pn, 
        function(obj) {
  
      pageNo = obj.pageNo;
  
      tbody.html('');
  
      for (l of obj.list) {
        var re = '';
        var sp = '\u00A0\u00A0\u00A0';
        for (var i = 1; i < l.step; i++) {
          re += sp + "ㄴ답변: ";
        }
        l.re = re;
      } 
  
      // handlebars-paginate 에서 사용할 값을 설정한다.
      obj.pagination = {
          page: obj.pageNo,
          pageCount: obj.totalPage
      };
  
      $(trGenerator(obj)).appendTo(tbody);
  
      $('.pagination-menu').html('');
      $(pageGenerator(obj)).appendTo('.pagination-menu');
  
      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
      $(document.body).trigger('loaded-list');
  
    }); // Bitcamp.getJSON(
  
  } // loadList()
  
  
  //페이지를 출력한 후 1페이지 목록을 로딩한다.
  loadList(1);
  

$(document.body).bind('loaded-list', (e) => {
  // 제목을 클릭했을 때 view.html로 전환시키기
    $('.heun-detail').on('click', function(e) {
      
      $.ajax({
        url: '../../app/json/qna/pwdCheck',
        type: 'POST',
        data: {
          qnaNo: $(e.target).attr('data-no')
        },
        dataType: 'json',
        success: function(response) {
          
          if(response.status == 'success'){
            
            location.href = 'view.html?no=' + $(e.target).attr('data-no');        
            
          } else {
            
            async function check(){
              
            const {value: password} = await Swal.fire({
              title: '게시글 비밀번호를 입력해주세요.',
              input: 'password',
              inputPlaceholder: 'Enter your password',
              inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
              }
            });

            $.ajax({
              url: '../../app/json/qna/password',
              type: 'POST',
              data: {
                qnaNo: $(e.target).attr('data-no'),
                pwd: password
              },
              dataType: 'json',
              success: function(response) {
                console.log(response)
                if(response.status == 'success'){
                  
                  location.href = 'view.html?no=' + $(e.target).attr('data-no');            
                  
                } else {
                  Swal.fire({
                    type: 'error',
                    title: '볼 수 없어요!',
                    text: '비밀번호가 틀리거나 아무것도 입력하지 않았네요.'});
                }
              },
              fail: function(error) {
                alert('시스템 오류가 발생했습니다.');
              }
            });
            
            }
             
            check();
            
            // var pw = prompt('비밀번호는?');
            
          }
        },
        fail: function(error) {
          eModal.alert('시스템 오류가 발생했습니다.');
        }
      });
      
    })
});


$('.heun-search > a').on('click', function() {
  
  $('.searchselect').html($(this).text());
  var selector = $(this).data('no');
  
  $('.search-btn').on('click', function(e){
    
  e.preventDefault();
  
  var title = $('.search-box').val()
  
  $.getJSON("../../app/json/qna/search?" + selector + "=" + title, function(obj) {

    tbody.html('');

    for (l of obj.list) {
      var re = '';
      for (var i = 1; i < l.step; i++) {
        re += '&nbsp;&nbsp;답변: ';
      }
      l.re = re;
    } 

    obj.pagination = {
      page: obj.pageNo,
      pageCount: obj.totalPage
    };


    $('.pagination-menu').html('');
    $(pageGenerator(obj)).appendTo('.pagination-menu');

    $(trGenerator(obj)).appendTo(tbody);

   
    // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
    $(document.body).trigger('loaded-list');
  });
});
})

