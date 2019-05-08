--권한
insert into auth(auth) values('일반회원');
insert into auth(auth) values('호스트');
insert into auth(auth) values('관리자');

-- 회원
insert into usr(usr_id,email,pwd,auth_id,name,tel)
  values(1,'tlwls@naver.com',password('1111'),1,'홍길동','010-4444-3333');
  insert into usr(email, pwd,auth_id,name,tel)
  values(2,'qwrwer@naver.com',password('1111'),1,'삼순이','010-5647-3333');
  insert into usr(email, pwd,auth_id,name,tel)
  values(3,'sadfe@naver.com',password('1111'),1,'둘리','010-4456-3433');
  insert into usr(email, pwd,auth_id,name,tel)
  values(4,'werdf@naver.com',password('1111'),1,'도넛','010-7894-3344');
  insert into usr(email, pwd,auth_id,name,tel)
  values(5,'sdfdsre@naver.com',password('1111'),2,'원빈','010-5452-3733');
  insert into usr(email, pwd,auth_id,name,tel)
  values(6,'sdafwerdf@naver.com',password('1111'),2,'한효주','010-4456-3133');
  insert into usr(email, pwd,auth_id,name,tel)
  values(7,'ewrsdf@daum.net',password('1111'),2,'강동원','010-4433-3322');
  insert into usr(email, pwd,auth_id,name,tel)
  values(8,'erwerdf@daum.net',password('1111'),2,'이지혜','010-4894-3733');
  insert into usr(email, pwd,auth_id,name,tel)
  values(9,'fgertewr@daum.net',password('1111'),1,'앙리','010-4466-3983');
  insert into usr(email, pwd,auth_id,name,tel)
  values(10,'ewrdsf@gmail.com',password('1111'),2,'김사랑','010-4411-3893');
  
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
  
--hst_qna
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(1,1,1,'화장실 수압은 어떤가요?','충분히 강합니다.','2019-05-28');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(2,1,2,'애완견 출입이 가능한가요?','가능합니다.','2019-05-02');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(3,1,2,'숙소는 깨끗한가요?','꺠끗합니다.','2019-05-03');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(4,2,3,'주변에 놀거리가 있나요?','3분거리에 계곡이 있습니다.','2019-05-11');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(5,2,3,'숯불 가격이 어떻게 되나요?','3인기준 3만원입니다.','2019-05-12');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(6,2,3,'방음은 잘되는 편인가요?','방음 처리는 완벽합니다.','2019-05-03');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(7,3,4,'퇴실시간을 넘기면 어떻게 하나요?','추가 비용이 발생합니다.','2019-05-14');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(8,3,4,'편의시설은 잘되있나요?','다 갖추고 있습니다.','2019-05-15');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(9,4,4,'보일러는 잘되나요?','잘됩니다.','2019-05-18');
 insert into hst_qna(hst_qna_id,usr_id,rms_id,conts,reply,reply_dt) 
values(10,5,5,'주변에 마트는 있나요?','5분거리에 대형 마트가 있습니다.','2019-05-20');

  
  
  