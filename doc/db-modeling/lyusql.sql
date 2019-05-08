insert into riw(usr_id, riw_conts, grd) values(1,'안마의자있어서 너무 좋았어요!! 컴퓨터를 오래봐서 어깨랑 허리랑 너무 아팠는데 발리에 쉬면서 뭉친 피로 다 풀었어요!!!! 디럭스 객실에도 안마의자라니....너무나 감동 ㅜㅜㅜ ...', 4 );
insert into riw(usr_id, riw_conts, grd) values(2,'깔끔하고 너무 편했어요 방이 진짜 따듯했는데 땀날정도였어요ㅋㅋㅋ 창문 열면 괜찮음!', 2 );
insert into riw(usr_id, riw_conts, grd) values(3,'여자 직원 두분 너무 친절하셔서 들어갈때부터 기분서좋았습니다 저렴한가격에 퀄리티 좋은 객실 너무 좋았습니다 지방에서 출장왔는데 서울올때마다 이용하고싶네요', 1 );
insert into riw(usr_id, riw_conts, grd) values(4,'남치니랑 신천에서 자주 노는뎅 갈때마다 테레즈 갑니당~~ 우선 깨끗하구 사장님이 넘넘 친절하세요~과자두 맛나구용 갈때마다 편하게 쓰구가는듯~ 거울방 너무 좋아서 거울방만 찾아영....... 별로에요', 3 );
insert into riw(usr_id, riw_conts, grd) values(5,'후기들 다 알바고 그저 그러겠거니 생각했는데 가보니까 진짜 만족했어요. 숙박업체 이용하고 평점 남기는것도 잘안하는데 정말 만족해서 댓글 답니다 사장님도 친절하셨어요', 3 );
insert into riw(usr_id, riw_conts, grd) values(6,'공주공주풍 한 느낌도 괜찮구 깨끗하고 조용하고 좋아요! 대실시간 엄청길어서 가성비 개굿 프런트직원분도 친절하셔서 기분좋게 갑니당 뿅', 2 );
insert into riw(usr_id, riw_conts, grd) values(7,'알바생이 음식을 자주 리필해서 좋았어요', 4 );
insert into riw(usr_id, riw_conts, grd) values(8,'직원분들이 친절하셔서 불편함없이 잘 지냈습니다', 2 );
insert into riw(usr_id, riw_conts, grd) values(9,'항상 데미안만 이용하고 있어요', 5 );
insert into riw(usr_id, riw_conts, grd) values(10,'공주공주풍 한 느낌도 괜찮구 깨끗하고 조용하고 좋아요! 대실시간 엄청길어서 가성비 개굿 프런트직원분도 친절하셔서 기분좋게 갑니당 뿅', 2 );


<<<<<<< HEAD

=======
-- qna
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(1,1,1,1,'예약이안되요','다시해보세요' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(2,2,1,1,'이용방법이','자세한사항은 전화로문의 해주세요' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(3,3,2,1,'날자를 변경해주세요','변경날자 알려주세요' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(4,4,2,1,'이용인원 변경이요','변경인원 알려주세요' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(5,5,2,1,'예약정보가 안뜨네요','페이지 새로고침 해보세요' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(6,6,1,1,'이용규칙이 왜안뜨죠 ??','사항문의바람' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(7,7,1,1,'가격 정보가 결제금액이오....랑 다른경우는 어덯게 하죠..','다시해보세요' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(8,8,2,1,'취소해주세요','취소요청부탁드립니다.' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(9,9,1,1,'예약 대기가 안되네요 ....','자세하게 말씀해주세요' );
insert into qna(usr_id, parent, ordr, step, content, qna_pawd) values(10,10,2,1,'예약이안되요','새로고침 해보세요' );
>>>>>>> branch 'master' of https://github.com/sonbyungjun/HeunheunTrip.git






-- 예약
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, rev_stus, stby_stus, rev_persn) 
values(1,1,1,'2019-05-08','2020-05-10','대기중', '승인', 2);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, stby_stus, rev_persn) 
values(2,4,2,'2019-05-02','2020-05-10', '거절', 2);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, stby_stus, rev_persn) 
values(3,3,3,'2019-06-08','2020-05-10', '승인', 2);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, stby_stus, rev_persn) 
values(4,2,4,'2019-11-08','2020-05-10', '승인', 1);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, rev_stus, stby_stus, rev_persn) 
values(5,4,5,'2019-12-28','2020-05-10','대기중', '거절', 3);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, stby_stus, rev_persn) 
values(6,4,6,'2019-01-08','2020-05-10', '승인', 5);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, rev_stus, stby_stus, rev_persn) 
values(7,3,7,'2019-02-08','2020-05-10','대기중', '승인', 1);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, rev_stus, stby_stus, rev_persn) 
values(8,4,8,'2019-04-08','2020-05-10','대기중', '거절', 4);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, stby_stus, rev_persn) 
values(9,4,9,'2019-06-18','2020-05-10', '거절', 2);
insert into rev(usr_id, stus_id, rms_id, cck_in, cck_out, rev_stus, stby_stus, rev_persn) 
values(10,2,10,'2019-07-11','2020-05-10','대기중', '승인', 3);




<<<<<<< HEAD














=======
-- 이용상태
>>>>>>> branch 'master' of https://github.com/sonbyungjun/HeunheunTrip.git
insert into stus(stus_id, stus) values(1,'결제완료');
insert into stus(stus_id, stus) values(2, '체크인' );
insert into stus(stus_id, stus) values(3, '체크아웃');
insert into stus(stus_id, stus) values(4, '결제취소');






_id, stus) values(2, '체크인' );
insert into stus(stus_id, stus) values(3, '체크아웃');
insert into stus(stus_id, stus) values(4, '결제취소');












