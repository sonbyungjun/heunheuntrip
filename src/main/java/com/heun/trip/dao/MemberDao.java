package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Member;

public interface MemberDao {
  int insert(Member member);
  List<Member> findAll(Map<String,Object> paramMap);
  Member findByNo(int no);
  Member findByEmailPassword(Map<String,Object> paramMap);
  int update(Member member);
  int Emailupdate(Member member);
  int delete(int no);
  int countAll(String search);
}
