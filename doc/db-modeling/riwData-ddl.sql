
DROP TABLE IF EXISTS riw RESTRICT;

-- 리뷰
CREATE TABLE riw (
  riw_id    INTEGER  NOT NULL, -- 리뷰번호
  usr_id    INTEGER  NOT NULL, -- 회원번호
  riw_conts TEXT     NOT NULL, -- 리뷰내용
  grd       VARCHAR(10) NOT NULL, -- 평점
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

