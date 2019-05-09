package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.MemberDao;
import com.heun.trip.domain.Member;
import com.heun.trip.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
  
  MemberDao memberDao;
  
  public MemberServiceImpl(MemberDao memberDao) {
    this.memberDao = memberDao;
  }
  
  @Override
  public List<Member> list(int pageNo, int pageSize, String search) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("search", search);
    return memberDao.findAll(params);
  }
  
  @Override
  public int add(Member member) {
    return memberDao.insert(member);
  }
  
  @Override
  public Member get(int no) {
    return memberDao.findByNo(no);
  }
  
  @Override
  public int update(Member member) {
    return memberDao.update(member);
  }
  
  @Override
  public int delete(int no) {
    return memberDao.delete(no);
  }
  
  @Override
  public Member get(String email, String password) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);
    
    return memberDao.findByEmailPassword(paramMap);
  }
  
  @Override
  public int size(String search) {
    return memberDao.countAll(search);
  }
}






