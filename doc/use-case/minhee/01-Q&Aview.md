# 고객센터 Q&A 조회하기(see Q&A)

회원, 비회원이 고객센터 QnA를 조회하는 것

## 주 액터(Primary Actor)

비회원, 회원

## 보조 액터(Secondary Actor)

## 사전 조건(Preconditions)

- 회원에 가입하지 않은 상태이다.
- 회원에 가입되어 있는 상태이다.

## 종료 조건(Postconditions)

- Q&A을 확인한다.

## 시나리오(Flow of Events)

### 고객센터 Q&A 조회하기

1. 액터는 고객센터 메뉴를 클릭한다.
2. 시스템은 고객센터 목록(기본 Q&A)을 출력한다.
3. 액터는 Q&A 목록에서 궁금한 사항을 클릭한다.
4. 시스템은 Q&A 목록 중 액터가 누른 항목의 상세 정보(Q&A 제목의 답변)를 출력한다.

## UI 프로토 타입

### Q&A 목록 보기
![Q&A 목록 보기](./images/Q&Amain.PNG)

### Q&A 목록 상세보기
![Q&A 목록 상세보기](./images/Q&A.PNG)
