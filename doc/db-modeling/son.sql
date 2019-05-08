-- 편의시설
INSERT INTO amn(amn_id,amn) VALUES(1,'무선 인터넷');
INSERT INTO amn(amn_id,amn) VALUES(2,'건조기');
INSERT INTO amn(amn_id,amn) VALUES(3,'다리미');
INSERT INTO amn(amn_id,amn) VALUES(4,'케이블 TV');
INSERT INTO amn(amn_id,amn) VALUES(5,'수건, 침대시트, 비누, 화장지');
INSERT INTO amn(amn_id,amn) VALUES(6,'난방');
INSERT INTO amn(amn_id,amn) VALUES(7,'세탁기');
INSERT INTO amn(amn_id,amn) VALUES(8,'에어컨');
INSERT INTO amn(amn_id,amn) VALUES(9,'온수');
INSERT INTO amn(amn_id,amn) VALUES(10,'헤어드라이어');

-- 숙소 
-- (호스트번호, '숙소명', 숙소가격, 최대 수용 인원, '우편번호', '기본주소', '상세주소', '위도', '경도', 
-- '숙소 이용 규칙', '오시는 길', '예약 취소 안내', '위약금 안내', '평균평점')
INSERT INTO rms(rms_id, usr_id,rm_name,rm_chge,max_ple,post_code,addr,dtil_addr,lati,longi,rule,map,cacl_gde,plty_gde,grd) 
  VALUES(1, 5, '[강남역] 러블리한 하우스, 카페같은 J-house', 50000, 2, '06129', '서울특별시 강남구 역삼동', '619-18', '37.5010877', '127.02713140000003', 
 '흡연 금지
반려동물 동반 불가
체크인 시간: 15:00~23:00, 체크아웃 시간: 11:00까지
키패드(으)로 셀프 체크인',
 '2호선 강남역 1번출구 - 1분거리 위치 ', '숙박 중 예약을 취소하면 일부 환불을 요청할 수 있습니다.',
 '체크인 30일 전까지 예약을 취소하면 모든 수수료를 포함한 요금 전액이 환불됩니다. 체크인까지 30일이 남지 않은 시점에 예약을 취소하면 수수료를 포함한 총 숙박 요금의 50%가 환불됩니다.',
 9);
 INSERT INTO rms(rms_id, usr_id,rm_name,rm_chge,max_ple,post_code,addr,dtil_addr,lati,longi,rule,map,cacl_gde,plty_gde,grd) 
  VALUES(2, 6, '강남역 1번출구 5분거리! 깨끗하고 넓고 이쁜집!', 60000, 5, '06128', '서울특별시 강남구 봉은사로6길', '39', '37.5026477', '127.0279289', 
 '반려동물 동반 불가 흡연, 파티 또는 이벤트 금지 체크인 시간: 15:00~02:00(다음 날), 체크아웃 시간: 11:00까지 스마트록(으)로 셀프 체크인',
 '강남역 도보 5분거리에 위치', '숙박 중 예약을 취소하면 일부 환불을 요청할 수 있습니다.',
 '체크인 30일 전까지 예약을 취소하면 모든 수수료를 포함한 요금 전액이 환불됩니다. 체크인까지 30일이 남지 않은 시점에 예약을 취소하면 수수료를 포함한 총 숙박 요금의 50%가 환불됩니다.',
 8);
  INSERT INTO rms(rms_id, usr_id,rm_name,rm_chge,max_ple,post_code,addr,dtil_addr,lati,longi,rule,map,cacl_gde,plty_gde,grd) 
  VALUES(3, 7, 'Bongs House 롯데타워 석촌호수 롯데월드뷰를 품은 환상의 공간', 55000, 4, '05554', '서울특별시 송파구 올림픽로', '240', '37.5112348', '127.09802739999998', 
 '유아(만 2세 미만) 및 반려동물에게 안전하거나 적합하지 않음
흡연, 파티 또는 이벤트 금지
체크인 시간: 16:00 이후 언제나, 체크아웃 시간: 12:00까지
스마트록(으)로 셀프 체크인',
 '종합운동장역(야구장, 올림픽 경기장) 지하철', '숙박 중 예약을 취소하면 일부 환불을 요청할 수 있습니다.',
 '체크인 30일 전까지 예약을 취소하면 모든 수수료를 포함한 요금 전액이 환불됩니다. 체크인까지 30일이 남지 않은 시점에 예약을 취소하면 수수료를 포함한 총 숙박 요금의 50%가 환불됩니다.',
 9);
   INSERT INTO rms(rms_id, usr_id,rm_name,rm_chge,max_ple,post_code,addr,dtil_addr,lati,longi,rule,map,cacl_gde,plty_gde,grd) 
  VALUES(4, 8, 'Bongs House 롯데타워 석촌호수 롯데월드뷰를 품은 환상의 공간', 55000, 4, '05554', '서울특별시 송파구 올림픽로', '240', '37.5112348', '127.09802739999998', 
 '유아(만 2세 미만) 및 반려동물에게 안전하거나 적합하지 않음
흡연, 파티 또는 이벤트 금지
체크인 시간: 16:00 이후 언제나, 체크아웃 시간: 12:00까지
스마트록(으)로 셀프 체크인',
 '종합운동장역(야구장, 올림픽 경기장) 지하철', '숙박 중 예약을 취소하면 일부 환불을 요청할 수 있습니다.',
 '체크인 30일 전까지 예약을 취소하면 모든 수수료를 포함한 요금 전액이 환불됩니다. 체크인까지 30일이 남지 않은 시점에 예약을 취소하면 수수료를 포함한 총 숙박 요금의 50%가 환불됩니다.',
 9);
   INSERT INTO rms(rms_id, usr_id,rm_name,rm_chge,max_ple,post_code,addr,dtil_addr,lati,longi,rule,map,cacl_gde,plty_gde,grd) 
  VALUES(5, 10, 'Bongs House 롯데타워 석촌호수 롯데월드뷰를 품은 환상의 공간', 55000, 4, '05554', '서울특별시 송파구 올림픽로', '240', '37.5112348', '127.09802739999998', 
 '유아(만 2세 미만) 및 반려동물에게 안전하거나 적합하지 않음
흡연, 파티 또는 이벤트 금지
체크인 시간: 16:00 이후 언제나, 체크아웃 시간: 12:00까지
스마트록(으)로 셀프 체크인',
 '종합운동장역(야구장, 올림픽 경기장) 지하철', '숙박 중 예약을 취소하면 일부 환불을 요청할 수 있습니다.',
 '체크인 30일 전까지 예약을 취소하면 모든 수수료를 포함한 요금 전액이 환불됩니다. 체크인까지 30일이 남지 않은 시점에 예약을 취소하면 수수료를 포함한 총 숙박 요금의 50%가 환불됩니다.',
 9);
 
 -- 숙소사진
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(1,1,'a1.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(2,1,'a2.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(3,1,'a3.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(4,1,'a4.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(5,1,'a5.gif');
 
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(6,2,'b1.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(7,2,'b2.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(8,2,'b3.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(9,2,'b4.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(10,2,'b5.gif');
 
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(11,3,'c1.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(12,3,'c2.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(13,3,'c3.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(14,3,'c4.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(15,3,'c5.gif');
 
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(16,4,'d1.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(17,4,'d2.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(18,4,'d3.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(19,4,'d4.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(20,4,'d5.gif');
 
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(21,5,'e1.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(22,5,'e2.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(23,5,'e3.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(24,5,'e4.gif');
 INSERT INTO rm_photo(r_photo_id,rms_id,rm_photo) VALUES(25,5,'e5.gif');
 
-- 숙소 편의시설
INSERT INTO rms_amn(amn_id,rms_id) VALUES(1,1);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(1,3);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(1,4);

INSERT INTO rms_amn(amn_id,rms_id) VALUES(2,7);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(2,5);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(2,9);

INSERT INTO rms_amn(amn_id,rms_id) VALUES(3,3);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(3,2);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(3,1);

INSERT INTO rms_amn(amn_id,rms_id) VALUES(4,10);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(4,9);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(4,4);

INSERT INTO rms_amn(amn_id,rms_id) VALUES(5,3);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(5,8);
INSERT INTO rms_amn(amn_id,rms_id) VALUES(5,7);
 
 
 
 
 
 
 