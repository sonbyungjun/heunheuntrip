DROP TABLE IF EXISTS rms RESTRICT;
DROP TABLE IF EXISTS photo RESTRICT;
DROP TABLE IF EXISTS stus RESTRICT;
DROP TABLE IF EXISTS board RESTRICT;
DROP TABLE IF EXISTS rm_photo RESTRICT;
DROP TABLE IF EXISTS rev RESTRICT;
DROP TABLE IF EXISTS riw RESTRICT;
DROP TABLE IF EXISTS usr RESTRICT;
DROP TABLE IF EXISTS auth RESTRICT;
DROP TABLE IF EXISTS rms_amn RESTRICT;
DROP TABLE IF EXISTS host RESTRICT;
DROP TABLE IF EXISTS bookmark RESTRICT;
DROP TABLE IF EXISTS qna RESTRICT;
DROP TABLE IF EXISTS hst_qna RESTRICT;
DROP TABLE IF EXISTS amn RESTRICT;
DROP TABLE IF EXISTS faq RESTRICT;

-- 숙소
CREATE TABLE rms (
  rms_id    INTEGER      NOT NULL, -- 숙소번호
  usr_id    INTEGER      NOT NULL, -- 호스트번호
  rm_name   VARCHAR(30)  NOT NULL, -- 숙소명
  rm_chge   INTEGER      NOT NULL, -- 숙소가격
  max_ple   INTEGER      NOT NULL, -- 최대 수용 인원> use heunheundb;

  post_code VARCHAR(5)   NOT NULL, -- 우편번호
  addr      VARCHAR(255) NOT NULL, -- 기본주소> use heunheundb;

  dtil_addr VARCHAR(255) NOT NULL, -- 상세주소
  lati      VARCHAR(50)  NOT NULL, -- 위도
  longi     VARCHAR(50)  NOT NULL, -- 경도
  rule      TEXT         NOT NULL, -- 숙소 이용 규칙
  map       TEXT         NOT NULL, -- 오시는 길
  cacl_gde  TEXT         NOT NULL, -- 예약 취소 안내
  cdt       DATETIME     NOT NULL DEFAULT current_timestamp(), -- 등록일
  plty_gde  TEXT         NOT NULL, -- 위약금 안내
  grd       INTEGER      NULL      -- 평균평점
);

-- 숙소
ALTER TABLE rms
  ADD CONSTRAINT PK_rms -- 숙소 기본키
    PRIMARY KEY (
      rms_id -- 숙소번호
    );

ALTER TABLE rms
  MODIFY COLUMN rms_id INTEGER NOT NULL AUTO_INCREMENT> use heunheundb;
;

-- 회원
CREATE TABLE usr (
  usr_id    INTEGER      NOT NULL, -- 회원번호
  email     VARCHAR(30)  NOT NULL, -- 이메일
  pwd       VARCHAR(15)  NOT NULL, -- 비밀번호
  auth_id   INTEGER      NOT NULL, -- 권한번호> use heunheundb;

  name      VARCHAR(10)  NOT NULL, -- 이름
  tel       VARCHAR(15)  NULL,     -- 전화번호
  usr_photo VARCHAR(255) NULL      -- 프로필사진
);

-- 회원> use heunheundb;

ALTER TABLE usr
  ADD CONSTRAINT PK_usr -- 회원 기본키
    PRIMARY KEY (
      usr_id -- 회원번호
    );

ALTER TABLE usr
  MODIFY COLUMN usr_id INTEGER NOT NULL AUTO_INCREMENT;

-- 블로그
CREATE TABLE board (
  board_id INTEGER     NOT NULL, -- 게시글번호
  usr_id   INTEGER     NOT NULL, -- 회원번호
  rms_id   INTEGER     NULL,     -- 숙소번호
  title    VARCHAR(50) NOT NULL, -- 게시글제목
  conts    TEXT        NOT NULL, -- 게시글내용
  cdt      DATETIME    NOT NULL DEFAULT current_timestamp() -- 작성일
);> use heunheundb;


-- 블로그
ALTER TABLE board
  ADD CONSTRAINT PK_board -- 블로그 기본키
    PRIMARY KEY (
      board_id -- 게시글번호
    );

ALTER TABLE board
  MODIFY COLUMN board_id INTEGER NOT NULL AUTO_INCREMENT;

-- 예약
CREATE TABLE rev (
  rev_id    INTEGER  NOT NULL, -- 예약번호
  usr_id    INTEGER  NOT NULL, -- 회원번호
  stus_id   INTEGER  NOT NULL, -- 이용 상태 번호
  rms_id    INTEGER  NOT NULL, -- 숙소번호
  cck_in    DATE     NOT NULL, -- 체크인
  cck_out   DATE     NOT NULL, -- 체크아웃
  rev_stus  CHAR(3)  NULL,     -- 예약대기상태
  stby_stus CHAR(2)  NOT NULL, -- 승인/거절/대기 상태
  rev_persn INTEGER  NOT NULL, -- 예약인원
  rev_cdt   DATETIME NOT NULL DEFAULT current_timestamp() -- 예약생성일
);

-- 예약
ALTER TABLE rev
  ADD CONSTRAINT PK_rev -- 예약 기본키
    PRIMARY KEY (
      rev_id -- 예약번호
    );

ALTER TABLE rev
  MODIFY COLUMN rev_id INTEGER NOT NULL AUTO_INCREMENT;

-- 문의사항
CREATE TABLE qna (
  qna_id  INTEGER     NOT NULL, -- 문의사항번호
  usr_id  INTEGER     NOT NULL, -- 회원번호
  parent  INTEGER     NOT NULL, -- 부모게시물번호
  ordr   INTEGER     NOT NULL, -- 순서
  step    INTEGER     NOT NULL, -- 단계
  content TEXT        NOT NULL, -- 문의내용
  qna_pwd VARCHAR(10) NOT NULL, -- 문의글비밀번호
  cdt     DATETIME    NOT NULL DEFAULT current_timestamp() -- 작성일
);

-- 문의사항
ALTER TABLE qna
  ADD CONSTRAINT PK_qna -- 문의사항 기본키
    PRIMARY KEY (
      qna_id -- 문의사항번호
    );

ALTER TABLE qna
  MODIFY COLUMN qna_id INTEGER NOT NULL AUTO_INCREMENT;

-- 즐겨찾기
CREATE TABLE bookmark (
  usr_id INTEGER NOT NULL, -- 회원번호
  rms_id INTEGER NOT NULL, -- 숙소번호
  memo   TEXT    NULL      -- 찜메모
);

-- 즐겨찾기
ALTER TABLE bookmark
  ADD CONSTRAINT PK_bookmark -- 즐겨찾기 기본키
    PRIMARY KEY (
      usr_id, -- 회원번호
      rms_id  -- 숙소번호
    );

-- 리뷰
CREATE TABLE riw (
  riw_id    INTEGER  NOT NULL, -- 리뷰번호
  usr_id    INTEGER  NOT NULL, -- 회원번호 변경 사항을 병합 때문에 덮어 쓰게 됩니다:
  doc/db-modeling/ddl.sql
  doc/db-modeling/lyusql.sql

  riw_conts TEXT     NOT NULL, -- 리뷰내용
  grd       INT      NOT NULL, -- 평점
  cdt       DATETIME NOT NULL DEFAULT current_timestamp(), -- 작성일
  riw_reply TEXT     NULL,     -- 답글
  reply_dt  DATE     NULL,     -- 답변일
  rms_id    INTEGER  NULL      -- 숙소번호
);

-- 리뷰
ALTER TABLE riw
  ADD CONSTRAINT PK_riw -- 리뷰 기본키
    PRIMARY KEY (
      riw_id -- 리뷰번호
    );

ALTER TABLE riw
  MODIFY COLUMN riw_id INTEGER NOT NULL AUTO_INCREMENT;

-- FAQ
CREATE TABLE faq (
  faq_id INTEGER NOT NULL, -- QnA번호
  faq    TEXT    NOT NULL, -- 자주묻는질문
  faq_an TEXT    NOT NULL  -- 자주묻는질문 답변
);

-- FAQ
ALTER TABLE faq
  ADD CONSTRAINT PK_faq -- FAQ 기본키
    PRIMARY KEY (
      faq_id -- QnA번호
    );

ALTER TABLE faq
  MODIFY COLUMN faq_id INTEGER NOT NULL AUTO_INCREMENT;

-- 숙소문의-회원
CREATE TABLE hst_qna (
  hst_qna_id INTEGER  NOT NULL, -- 숙소문의번호-회원
  usr_id     INTEGER  NOT NULL, -- 회원번호
  rms_id     INTEGER  NOT NULL, -- 숙소번호
  conts      TEXT     NOT NULL, -- 내용
  cdt        DATETIME NOT NULL DEFAULT current_timestamp(), -- 작성일
  reply      TEXT     NULL,     -- 답변
  reply_dt   DATETIME NULL      -- 답변일
);

-- 숙소문의-회원
ALTER TABLE hst_qna
  ADD CONSTRAINT PK_hst_qna -- 숙소문의-회원 기본키
    PRIMARY KEY (
      hst_qna_id -- 숙소문의번호-회원
    );

ALTER TABLE hst_qna
  MODIFY COLUMN hst_qna_id INTEGER NOT NULL AUTO_INCREMENT;

-- 권한
CREATE TABLE auth (
  auth_id INTEGER    NOT NULL, -- 권한번호
  auth    VARCHAR(5) NOT NULL  -- 권한
);

-- 권한
ALTER TABLE auth
  ADD CONSTRAINT PK_auth -- 권한 기본키
    PRIMARY KEY (
      auth_id -- 권한번호
    );
 변경 사항을 병합 때문에 덮어 쓰게 됩니다:
  doc/db-modeling/ddl.sql
  doc/db-modeling/lyusql.sql

ALTER TABLE auth
  MODIFY COLUMN auth_id INTEGER NOT NULL AUTO_INCREMENT;

-- 게시글사진
CREATE TABLE photo (
  photo_id INTEGER      NOT NULL, -- 게시글사진번호
  photo    VARCHAR(255) NOT NULL, -- 게시글사진
  board_id INTEGER      NOT NULL  -- 게시글번호
);

-- 게시글사진
ALTER TABLE photo
  ADD CONSTRAINT PK_photo -- 게시글사진 기본키
    PRIMARY KEY (
      photo_id -- 게시글사진번호 변경 사항을 병합 때문에 덮어 쓰게 됩니다:
  doc/db-modeling/ddl.sql
  doc/db-modeling/lyusql.sql

    );

ALTER TABLE photo
  MODIFY COLUMN photo_id INTEGER NOT NULL AUTO_INCREMENT;

-- 호스트
CREATE TABLE host (
  usr_id  INTEGER     NOT NULL, -- 호스트번호
  bank    VARCHAR(10) NOT NULL, -- 은행명
  bank_id VARCHAR(30) NOT NULL  -- 계좌번호
);

-- 호스트
ALTER TABLE host
  ADD CONSTRAINT PK_host -- 호스트 기본키
    PRIMARY KEY (
      usr_id -- 호스트번호
    );

ALTER TABLE host
  MODIFY COLUMN usr_id INTEGER NOT NULL AUTO_INCREMENT;

-- 편의시설
CREATE TABLE amn (
  amn_id INTEGER     NOT NULL, -- 편의 시설번호
  amn    VARCHAR(10) NOT NULL  -- 옵션 이름
);

-- 편의시설
ALTER TABLE amn
  ADD CONSTRAINT PK_amn -- 편의시설 기본키
    PRIMARY KEY (
      amn_id -- 편의 시설번호
    );

ALTER TABLE amn
  MODIFY COLUMN amn_id INTEGER NOT NULL AUTO_INCREMENT;

-- 이용상태
CREATE TABLE stus (
  stus_id INTEGER  NOT NULL, -- 이용 상태 번호
  stus    CHAR(10) NOT NULL  -- 이용 상태
);

-- 이용상태
ALTER TABLE stus
  ADD CONSTRAINT PK_stus -- 이용상태 기본키
    PRIMARY KEY (
      stus_id -- 이용 상태 번호
    );

ALTER TABLE stus
  MODIFY COLUMN stus_id INTEGER NOT NULL AUTO_INCREMENT;

-- 숙소편의시설
CREATE TABLE rms_amn (
  amn_id INTEGER NOT NULL, -- 편의 시설번호
  rms_id INTEGER NOT NULL  -- 숙소번호
);

-- 숙소편의시설
ALTER TABLE rms_amn
  ADD CONSTRAINT PK_rms_amn -- 숙소편의시설 기본키
    PRIMARY KEY (
      amn_id, -- 편의 시설번 변경 사항을 병합 때문에 덮어 쓰게 됩니다:
  doc/db-modeling/ddl.sql
  doc/db-modeling/lyusql.sql
호
      rms_id  -- 숙소번호
    );

-- 숙소사진
CREATE TABLE rm_photo (
  r_photo_id INTEGER      NOT NULL, -- 숙소사진번호
  rms_id     INTEGER      NOT NULL, -- 숙소번호
  rm_photo   VARCHAR(255) NOT NULL  -- 사진
);

-- 숙소사진
ALTER TABLE rm_photo
  ADD CONSTRAINT PK_rm_photo -- 숙소사진 기본키
    PRIMARY KEY (
      r_photo_id -- 숙소사진번호
    );

ALTER TABLE rm_photo
  MODIFY COLUMN r_photo_id INTEGER NOT NULL AUTO_INCREMENT;

-- 숙소
ALTER TABLE rms
  ADD CONSTRAINT FK_host_TO_rms -- 호스트 -> 숙소
    FOREIGN KEY (
      usr_id -- 호스트번호
    )
    REFERENCES host ( -- 호스트
      usr_id -- 호스트번호
    );

-- 회원
ALTER TABLE usr
  ADD CONSTRAINT FK_auth_TO_usr -- 권한 -> 회원
    FOREIGN KEY (
      auth_id -- 권한번호
    )
    REFERENCES auth ( -- 권한
      auth_id -- 권한번호
    );

-- 블로그
ALTER TABLE board
  ADD CONSTRAINT FK_usr_TO_board -- 회원 -> 블로그
    FOREIGN KEY (
      usr_id -- 회원번호
    )
    REFERENCES usr ( -- 회원
      usr_id -- 회원번호
    );

-- 블로그
ALTER TABLE board
  ADD CONSTRAINT FK_rms_TO_board -- 숙소 -> 블로그
    FOREIGN KEY (
      rms_id -- 숙소번호
    )
    REFERENCES rms ( -- 숙소
      rms_id -- 숙소번호
    );

-- 예약
ALTER TABLE rev
  ADD CONSTRAINT FK_usr_TO_rev -- 회원 -> 예약
    FOREIGN KEY (
      usr_id -- 회원번호
    )
    REFERENCES usr ( -- 회원
      usr_id -- 회원번호
    );

-- 예약
ALTER TABLE rev
  ADD CONSTRAINT FK_stus_TO_rev -- 이용상태 -> 예약
    FOREIGN KEY (
      stus_id -- 이용 상태 번호
    )
    REFERENCES stus ( -- 이용상태
      stus_id -- 이용 상태 번호
    );

-- 예약
ALTER TABLE rev
  ADD CONSTRAINT FK_rms_TO_rev -- 숙소 -> 예약
    FOREIGN KEY (
      rms_id -- 숙소번호
    )
    REFERENCES rms ( -- 숙소
      rms_id -- 숙소번호
    );

-- 문의사항
ALTER TABLE qna
  ADD CONSTRAINT FK_usr_TO_qna -- 회원 -> 문의사항
    FOREIGN KEY (
      usr_id -- 회원번호
    )
    REFERENCES usr ( -- 회원
      usr_id -- 회원번호
    );

-- 즐겨찾기
ALTER TABLE bookmark
  ADD CONSTRAINT FK_usr_TO_bookmark -- 회원 -> 즐겨찾기
    FOREIGN KEY (
      usr_id -- 회원번호
    )
    REFERENCES usr ( -- 회원
      usr_id -- 회원번호
    );

-- 즐겨찾기
ALTER TABLE bookmark
  ADD CONSTRAINT FK_rms_TO_bookmark -- 숙소 -> 즐겨찾기
    FOREIGN KEY (
      rms_id -- 숙소번호
    )
    REFERENCES rms ( -- 숙소
      rms_id -- 숙소번호
    );

-- 리뷰
ALTER TABLE riw
  ADD CONSTRAINT FK_usr_TO_riw -- 회원 -> 리뷰
    FOREIGN KEY (
      usr_id -- 회원번호
    )
    REFERENCES usr ( -- 회원
      usr_id -- 회원번호
    );

-- 리뷰
ALTER TABLE riw
  ADD CONSTRAINT FK_rms_TO_riw -- 숙소 -> 리뷰
    FOREIGN KEY (
      rms_id -- 숙소번호
    )
    REFERENCES rms ( -- 숙소
      rms_id -- 숙소번호
    );

-- 숙소문의-회원
ALTER TABLE hst_qna
  ADD CONSTRAINT FK_usr_TO_hst_qna -- 회원 -> 숙소문의-회원
    FOREIGN KEY (
      usr_id -- 회원번호
    )
    REFERENCES usr ( -- 회원
      usr_id -- 회원번호
    );

-- 숙소문의-회원
ALTER TABLE hst_qna
  ADD CONSTRAINT FK_rms_TO_hst_qna -- 숙소 -> 숙소문의-회원
    FOREIGN KEY (
      rms_id -- 숙소번호
    )
    REFERENCES rms ( -- 숙소
      rms_id -- 숙소번호
    );

-- 게시글사진
ALTER TABLE photo
  ADD CONSTRAINT FK_board_TO_photo -- 블로그 -> 게시글사진
    FOREIGN KEY (
      board_id -- 게시글번호
    )
    REFERENCES board ( -- 블로그
      board_id -- 게시글번호
    );

-- 호스트
ALTER TABLE host
  ADD CONSTRAINT FK_usr_TO_host -- 회원 -> 호스트
    FOREIGN KEY (
      usr_id -- 호스트번호
    )
    REFERENCES usr ( -- 회원
      usr_id -- 회원번호
    );

-- 숙소편의시설
ALTER TABLE rms_amn
  ADD CONSTRAINT FK_amn_TO_rms_amn -- 편의시설 -> 숙소편의시설
    FOREIGN KEY (
      amn_id -- 편의 시설번호
    )
    REFERENCES amn ( -- 편의시설
      amn_id -- 편의 시설번호
    );

-- 숙소편의시설
ALTER TABLE rms_amn
  ADD CONSTRAINT FK_rms_TO_rms_amn -- 숙소 -> 숙소편의시설
    FOREIGN KEY (
      rms_id -- 숙소번호
    )
    REFERENCES rms ( -- 숙소
      rms_id -- 숙소번호
    );

-- 숙소사진
ALTER TABLE rm_photo
  ADD CONSTRAINT FK_rms_TO_rm_photo -- 숙소 -> 숙소사진
    FOREIGN KEY (
      rms_id -- 숙소번호
    )
    REFERENCES rms ( -- 숙소
      rms_id -- 숙소번호
    );