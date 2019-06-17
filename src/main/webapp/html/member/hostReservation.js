var form = $('.card-list'),
    templateSrc = $('#tr-template').html(),
    trGenerator = Handlebars.compile(templateSrc),
    paginateSrc = $('#page-template').html(),
    pageNo = 0;
 
Handlebars.registerHelper('paginate', paginate);
var pageGenerator = Handlebars.compile(paginateSrc);

$(document).ready(function () {
  $("#heun-header").load("/heunheuntrip/html/header.html", function () {
    $(".heun-header-nav").removeClass("navbar-over absolute-top");
  });
  $("#heun-footer").load("/heunheuntrip/html/footer.html");  
  
  loadList(1);
      
})


function loadList(pn) {
  
  window.pageNo = $('#pageNo').data('no');
  
  $.getJSON('../../app/json/rev/listInHostPage?pageNo=' + pn, function(obj) {
    
    
    for(l of obj.list){
      if(l.revDelete === 1){
        l.revDelete = true;
      } else {
        l.revDelete = false;
      }
      
      if(l.revUpdate !== 0){
        l.update = true;
      } else {
        l.update = false;
      }
    }
    console.log(obj.list);
    
    pageNo = obj.pageNo;
    
    form.html('');
    
    obj.pagination = {
        page: obj.pageNo,
        pageCount: obj.totalPage
    };
    
    $(trGenerator(obj)).appendTo(form);
    
    $('.pagination-menu').html('');
    $(pageGenerator(obj)).appendTo('.pagination-menu');
  
    $(document.body).trigger('loaded-list');
 
  }); 
}


$(document.body).bind('loaded-list', (e) => {

  $('.modal-close').on('hidden', function() { $(this).empty(); });
  
  // 예약 삭제
  $('#rev-delete').off('click').on('click', function(e){
    e.preventDefault();
    
    var revNo = $(e.target).data('no');
    
    Swal.fire({
      text: "예약을 삭제하시겠습니까?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result) => {

      if (result.value) {
        
        $.ajax({
          url: '../../app/json/rev/deleteInHostpage',
          type: 'POST',
          data: {
            no : revNo
          },
          dataType: 'json',
          success: function(response) {
              
              Swal.fire(
                  'Success!',
                  '삭제되었습니다.',
                  'success'
                ).then(() => {
                  loadList(window.pageNo);
                  window.pageNo = 0;
                })
          },
          fail: function(error) {
            alert('등록 실패!!');
          }
        });
        
      }
    })
    
  });
  
  // 예약 변경
  $('.rev-update').off('click').on('click', function(e){
    
    function loadData(pn){
      $.getJSON('../../app/json/rev/detail?no=' + pn, function(obj) {
        
        console.log(obj);
        
        $('.be-person').text(obj.rev.revPerson + "명 ");
        $('.be-check-In').text(obj.rev.checkIn);
        $('.be-check-Out').text(obj.rev.checkOut);
        $('.be-name').text(obj.rev.guestName);
        
      }); 
    }
    
    var revNo = $(e.target).data('no');
    var revUpdateNo = $(e.target).attr('data-rev');
    var checkIn = $(e.target).parent().prev().children('.cck-in').text()
    var checkOut = $(e.target).parent().prev().children('.cck-out').text()
    var revName = $(e.target).parent().prev().children('.rev-name').text()
    var revPp = $(e.target).parent().prev().children('.rev-pp').text()
    var revReason = $(e.target).attr('data-reas');
    
    // 이전 데이터를 가져온다.
    loadData(revUpdateNo);

    $('.check-In').text(checkIn);
    $('.check-Out').text(checkOut);
    $('.name').text(revName);
    $('.person').text(revPp);
    $('.reason').text(revReason);
    
    $('.update').off('click').on('click', function(e){
      
      Swal.fire({
        text: "변경하시겠습니까?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네',
        cancelButtonText: '아니오'
      }).then((result) => {
        
        if (result.value) {
          
          $.ajax({
            url: '../../app/json/rev/change',
            type: 'POST',
            data: {
              no : revNo
            },
            dataType: 'json',
            success: function(response) {
              
              if(response.status == "success"){
                
                $.ajax({
                  url: '../../app/json/rev/deleteInHostpage',
                  type: 'POST',
                  data: {
                    no : revUpdateNo
                  },
                  dataType: 'json',
                  success: function(response) {
                    
                    if(response.status == "success"){
                      
                      $.ajax({
                        url: '../../app/json/rev/addCompleteSms',
                        type: 'GET',
                        data: {
                          no : revNo
                        },
                        dataType: 'json',
                        success: function(response) {
                          Swal.fire(
                              'Success!',
                              '변경되었습니다.',
                              'success'
                          ).then(() => {
                            loadList(window.pageNo);
                            window.pageNo = 0;
                            $('#update-modal').modal("hide");
                          })
                        },
                        fail: function(error) {
                          alert('등록 실패!!');
                        }
                      });
                    }
                  },
                  fail: function(error) {
                    alert('등록 실패!!');
                  }
                });
              }
            }
          });
        }
      })
    }); // 예약 변경 승낙 end 
    
    // 예약 변경을 거절한다.
    $('.update-cancel').off('click').on('click', function(e){
      
      Swal.fire({
        text: "거절하시겠습니까?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네',
        cancelButtonText: '아니오'
      }).then((result) => {

        if (result.value) {
          
          $.ajax({
            url: '../../app/json/rev/deleteInHostpage',
            type: 'POST',
            data: {
              no : revNo
            },
            dataType: 'json',
            success: function(response) {
              
              $.ajax({
                url: '../../app/json/rev/addCancelSms',
                type: 'GET',
                data: {
                  no : revUpdateNo
                },
                dataType: 'json',
                success: function(response) {
                  Swal.fire(
                      'Success!',
                      '거절하였습니다.',
                      'success'
                    ).then(() => {
                      loadList(window.pageNo);
                      window.pageNo = 0;
                      $('#update-modal').modal("hide");
                    })
                },
                fail: function(error) {
                  alert('등록 실패!!');
                }
              });
            }
          });
        }
      })
      
    }) // 예약 변경 거절 end
    
    
  })
});


