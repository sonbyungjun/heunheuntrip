var param = location.href.split('?')[1];
if (param) {
  document.querySelector('h1').innerHTML = '회원 상세조회';
  loadData(param.split('=')[1]);
  var el = document.querySelectorAll('.bit-new-item');
  for (e of el) {
    e.style.display = 'none';
  }
} else {
  document.querySelector('h1').innerHTML = '회원가입';
  var el = document.querySelectorAll('.bit-view-item');
  for (e of el) {
    e.style.display = 'none';
  }
}

function loadData(no) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4 || xhr.status != 200) 
      return;
    var data = JSON.parse(xhr.responseText);
    console.log(data)
    document.querySelector('#no').value = data.no;
    document.querySelector('#name').value = data.name;
    document.querySelector('#email').value = data.email;
    document.querySelector('#tel').value = data.tel;
    document.querySelector('#createdDate').value = data.createdDate;
  };
  xhr.open('GET', '../../app/json/member/detail?no=' + no, true);
  xhr.send();
}

document.querySelector('#update-btn').onclick = () => {
	  var xhr = new XMLHttpRequest()
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState != 4 || xhr.status != 200)
	      return;
	    
	    var data = JSON.parse(xhr.responseText);
	    
	    if (data.status == 'success') {
	      location.href = "index.html"
	        
	    } else {
	      alert('변경 실패입니다!\n' + data.message)
	    }
	  };
	  
	  xhr.open('POST', '../../app/json/member/update', true)
	  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  
	  var no = document.querySelector('#no').value;
	  var name = document.querySelector('#name').value;
	  var password = document.querySelector('#password').value;
	  var email = document.querySelector('#email').value;
	  var tel = document.querySelector('#tel').value;
	 
	  var qs =
	    'no=' + no + '&name=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(password)
	    + '&email=' + encodeURIComponent(email) + '&tel=' + encodeURIComponent(tel);
	  
	
	  xhr.send(qs);
	};

	document.querySelector('#delete-btn').onclick = () => {
		  var xhr = new XMLHttpRequest()
		  xhr.onreadystatechange = function() {
		    if (xhr.readyState != 4 || xhr.status != 200)
		      return;
		    
		    var data = JSON.parse(xhr.responseText);
		    
		    if (data.status == 'success') {
		      location.href = "index.html"
		        
		    } else {
		      alert('삭제 실패입니다!\n' + data.message)
		    }
		  };
		  var no = document.querySelector('#no').value;
		  xhr.open('GET', '../../app/json/member/delete?no=' + no, true)
		  xhr.send();
		};
	
	
	
	

