package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Member;

public interface MemberService {
  List<Member> list(int pageNo, int pageSize, String search);
  int add(Member member);
  int snsadd(Member member);
  Member get(int no);
  Member get(String email, String password);
  Member snsget(String email, int sns_no);
  int update(Member member);
  int Emailupdate(Member member); 
  int delete(int no); 
  int size(String search);
}

