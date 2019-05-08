--권한
insert into auth(auth) values('일반회원');
insert into auth(auth) values('호스트');
insert into auth(auth) values('관리자');

-- 회원
insert into usr(usr_id,email,pwd,auth_id,name,tel)
  values(1,'tlwls@naver.com','1111',1,'홍길동','010-4444-3333');
  insert into usr(email, pwd,auth_id,name,tel)
  values(2,'qwrwer@naver.com','2222',1,'삼순이','010-5647-3333');
  insert into usr(email, pwd,auth_id,name,tel)
  values(3,'sadfe@naver.com','3333',1,'둘리','010-4456-3433');
  insert into usr(email, pwd,auth_id,name,tel)
  values(4,'werdf@naver.com','4444',1,'도넛','010-7894-3344');
  insert into usr(email, pwd,auth_id,name,tel)
  values(5,'sdfdsre@naver.com','5555',2,'원빈','010-5452-3733');
  insert into usr(email, pwd,auth_id,name,tel)
  values(6,'sdafwerdf@naver.com','6666',2,'한효주','010-4456-3133');
  insert into usr(email, pwd,auth_id,name,tel)
  values(7,'ewrsdf@daum.net','7777',2,'강동원','010-4433-3322');
  insert into usr(email, pwd,auth_id,name,tel)
  values(8,'erwerdf@daum.net','8888',2,'이지혜','010-4894-3733');
  insert into usr(email, pwd,auth_id,name,tel)
  values(9,'fgertewr@daum.net','9999',1,'앙리','010-4466-3983');
  insert into usr(email, pwd,auth_id,name,tel)
  values(10,'ewrdsf@gmail.com','4567',2,'김사랑','010-4411-3893');
  
  --호스트
insert into host(user_id,bank,bank_id) 
values(5,'신한','110-3334-6587');
insert into host(user_id,bank,bank_id) 
values(6,'농협','110-33784-6447');
insert into host(user_id,bank,bank_id) 
values(7,'신한','110-2224-7789');
insert into host(user_id,bank,bank_id) 
values(8,'하나','7894-3334-6587');
insert into host(user_id,bank,bank_id) 
values(10,'기업','7894-78945-61245');
  
--faq
insert into faq(faq_id,faq,faq_an) 
values(1,'환불은 어떻게 하나요?','3일내 하셔야해요');
insert into faq(faq_id,faq,faq_an) 
values(2,'예약취소 어떻게 하나요?','결제취소 누르면되요');
insert into faq(faq_id,faq,faq_an) 
values(3,'할인혜택도 있나요?','없습니다.');
insert into faq(faq_id,faq,faq_an) 
values(4,'무통장 입금도 가능한가요?','가능합니다');
insert into faq(faq_id,faq,faq_an) 
values(5,'흔흔사이트 계정은 어떻게 만드나요?','heunheun.com 가셔서 회원가입하시면됩니다.');
insert into faq(faq_id,faq,faq_an) 
values(6,'친구나 가족을 대신하여 예약할수 있나요?','예 가능합니다');
insert into faq(faq_id,faq,faq_an) 
values(7,'예약하기 전에 숙소를 직접 볼수 있나요?','가능합니다,다만 숙소를 방문하지 않고도 숙소 및 호스트에 대해 알아 볼수있습니다.');
insert into faq(faq_id,faq,faq_an) 
values(8,'예약완료시 숙방정보는 문자로 보내주시나요?','결제하는 즉시 보내드립니다.');
insert into faq(faq_id,faq,faq_an) 
values(9,'회원은 예약 상태를 어떻게 확인 하나요?','호스트가 예약 요청을 수락하면 이메일로 알림을 받게 되며, 계정의 알림 설정에 따라 에어비앤비로부터 문자(SMS)나 푸시 알림을 받게 됩니다');
insert into faq(faq_id,faq,faq_an) 
values(10,'예약 요청은 어떻게 보내나요?','숙소 페이지에서 예약 요청을 클릭하세요.');
  
  
  
  
  