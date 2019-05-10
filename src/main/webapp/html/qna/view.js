var param = location.href.split('?')[1];
if (param) {
  document.querySelector('h1').innerHTML = "QnA 조회"
  loadData(param.split('=')[1])
  var el = document.querySelectorAll('.bit-new-item');
  for(e of el){
    e.style.display = 'none';
  }
} else {
  document.querySelector('h1').innerHTML = "새 글"
  var el = document.querySelectorAll('.bit-view-item');
  for(e of el){
    e.style.display = 'none';
  }
}

document.querySelector('#delete-btn').onclick = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState != 4 || xhr.status != 200){
      return;
    } 
    var data = JSON.parse(xhr.responseText);
    
    if(data.status == 'success'){
      location.href = "index.html"
    } else {
      alert('삭제 실패입니다!\n' + data.message)
    }
  };
  
  var no = document.querySelector('#no').value;
  xhr.open('GET', '../../app/json/qna/delete?no=' + no, true);
  xhr.send();
};

document.querySelector('#add-btn').onclick = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState != 4 || xhr.status != 200){
      return;
    } 
    var data = JSON.parse(xhr.responseText);
    
    if(data.status == 'success'){
      location.href = "index.html"
    } else {
      alert('등록 실패입니다!\n' + data.message)
    }
    
  };
  xhr.open('POST', '../../app/json/qna/add', true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  
  var title = document.querySelector('#title').value;
  var content = document.querySelector('#content').value;
  var categoryNo = document.querySelector('#categoryNo').value;
  
  var qs = "title=" + encodeURIComponent(title) +
  "&content=" + encodeURIComponent(content) +
  "&categoryNo=" + categoryNo;
  
  console.log(qs);
  
  xhr.send(qs);
};

/*

document.querySelector('#update-btn').onclick = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState != 4 || xhr.status != 200){
      return;
    } 
    var data = JSON.parse(xhr.responseText);
    
    if(data.status == 'success'){
      location.href = "index.html"
    } else {
      alert('변경 실패입니다!\n' + data.message)
    }
    
  };
  xhr.open('POST', '../../app/json/board/update', true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  
  var no = document.querySelector('#no').value;
  var contents = document.querySelector('#contents').value;
  
  var qs = 'contents=' + encodeURIComponent(contents) +
    '&no=' + no;
  
  xhr.send(qs);
};
*/
function loadData(no) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState != 4 || xhr.status != 200){
      return;
    }
    
    var data = JSON.parse(xhr.responseText);
   
    document.querySelector('#no').value = data.no;
    document.querySelector('#categoryNo').value = data.categoryNo;
    document.querySelector('#userNo').value = data.userNo;
    document.querySelector('#title').value = data.title;
    document.querySelector('#content').value = data.content;
    document.querySelector('#createdDate').value = data.createdDate;
    document.querySelector('#viewCount').value = data.viewCount;
  };
  
  xhr.open('GET', '../../app/json/qna/detail?no=' + no, true);
  xhr.send();
}



















