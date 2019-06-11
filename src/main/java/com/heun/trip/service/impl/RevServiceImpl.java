package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.RevDao;
import com.heun.trip.domain.Rev;
import com.heun.trip.service.RevService;

@Service
public class RevServiceImpl implements RevService {

  RevDao revDao;

  public RevServiceImpl(RevDao revDao) {
    this.revDao = revDao;
  }

  
  @Override
  public int inupdate(Rev rev) {
    return revDao.inupdate(rev);
  }
  
  @Override
  public List<Rev> list(int pageNo, int pageSize, int userNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("userNo", userNo);
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    
    return revDao.findAll(params);
  }
  
  @Override
  public Rev detail(int no) {
    
    return revDao.findByNo(no);
  }

  @Override
  public int count(Map<String, Object> params) {
    return revDao.count(params);
  }
  
  @Override
  public int size(int no) {
    return revDao.countAll(no);
  }


}







