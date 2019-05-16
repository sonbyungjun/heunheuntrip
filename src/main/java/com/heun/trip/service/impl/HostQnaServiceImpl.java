package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.HostQnaDao;
import com.heun.trip.domain.HostQna;
import com.heun.trip.service.HostQnaService;

@Service
public class HostQnaServiceImpl implements HostQnaService {

  HostQnaDao hostqnaDao;

  public HostQnaServiceImpl( HostQnaDao hostqnaDao) {
    this.hostqnaDao = hostqnaDao;
  }

  @Override
  public List<HostQna> list(int pageNo, int pageSize) {
    HashMap<String,Object> params = new HashMap<>();
  params.put("size", pageSize);
  params.put("rowNo", (pageNo - 1) * pageSize);
  
  return hostqnaDao.findAll(params);
  }

  @Override
  public int size() {
    return hostqnaDao.countAll();
  }

@Override
public int delete(int no) {
  return hostqnaDao.delete(no);
}

@Override
public int add(HostQna hostqna) {
  return hostqnaDao.insert(hostqna);
}

//@Override
//public int update(Faq faq) {
//  return faqDao.update(faq);
//}

//  @Override
//  public Faq get(int no) {
//    return faqDao.findByNo(no);
//  }
//  
//  @Override
//  public List<Qna> reList(int parent,  int step) {
//    HashMap<String,Object> params = new HashMap<>();
//    params.put("parent", parent);
//    params.put("step", step);
//    return FaqDao.findByReList(params);
//  }
}







