package com.heun.trip.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Member;

public interface MemberDao {
  int insert(Member member);
  int bankinsert(Map<String,Object> paramMap);
  int snsinsert(Member member);
  List<Member> findAll(Map<String,Object> paramMap);
  Member findByNo(int no);
  Member findByEmailPassword(Map<String,Object> paramMap);
  Member findByEmailName(Map<String,Object> paramMap);
  Member findByEmailSns(HashMap<String, Object> paramMap);
  Member findByEmail(String email);
  int update(Map<String,Object> paramMap);
  int profileupdate(Member member);
  int Emailupdate(Member member); 
  int delete(int no);
  int countAll(String search);
  String extractHostTel(int no);
  int findByTel(String tel);
}
