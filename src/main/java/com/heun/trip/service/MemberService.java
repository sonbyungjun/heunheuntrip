package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Member;

public interface MemberService {
  List<Member> list(int pageNo, int pageSize, String search);
  int add(Member member);
  Member get(int no);
  Member get(String email, String password);
  int update(Member member);
  int delete(int no);
  int size(String search);
}

