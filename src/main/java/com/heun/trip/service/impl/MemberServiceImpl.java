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
  
     if(member.getAuth().equals("2")) {
       HashMap<String,Object> params = new HashMap<>();
       try {
         memberDao.insert(member);
         params.put("no", member.getNo());
         params.put("bank", member.getBank());
         params.put("bnkno", member.getBnk_no());
       } catch (Exception e) {
         e.printStackTrace();
       }
        return memberDao.bankinsert(params);     
     }
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
  public int profileupdate(Member member) {
    return memberDao.profileupdate(member);
  }
  
  @Override
  public int pwdupdate(Member member) {
    return memberDao.profileupdate(member);
  }
  
  
  
  @Override
  public int Emailupdate(Member member) {
    return memberDao.Emailupdate(member);
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
  public Member snsget(String email, int sns_no) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("sns_no",sns_no);
    
    return memberDao.findByEmailSns(paramMap);
  }
  
  @Override
  public int size(String search) {
    return memberDao.countAll(search);
  }

  @Override
  public int snsadd(Member member) {
    
    return memberDao.snsinsert(member);
  }

  @Override
  public Member get(String email) {
    
    return memberDao.findByEmail(email);
  }
  
}







