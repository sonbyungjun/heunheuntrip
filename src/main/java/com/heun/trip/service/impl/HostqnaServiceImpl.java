package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.HostqnaDao;
import com.heun.trip.domain.Hostqna;
import com.heun.trip.service.HostqnaService;

@Service
public class HostqnaServiceImpl implements HostqnaService {

  HostqnaDao hostQnaDao;

  public HostqnaServiceImpl(HostqnaDao hostQnaDao) {
    this.hostQnaDao = hostQnaDao;
  }

  @Override
  public List<Hostqna> list(int pageNo, int pageSize) {

    HashMap<String,Object> params = new HashMap<>();
    //    params.put("size", pageSize);
    //    params.put("rowNo", (pageNo - 1) * pageSize);
    //    
    return hostQnaDao.findAll(params);
  }

  @Override
  public int add(Hostqna hostqna) {
    
    return hostQnaDao.insert(hostqna);
  }

  @Override
  public Hostqna get(int no) {
    Hostqna hostqna = hostQnaDao.findByNo(no);
    if (hostqna != null) {
      hostQnaDao.increaseCount(no);
    }
    return hostqna;
  }
    
    @Override
    public int update(Hostqna hostqna) {
    return hostQnaDao.update(hostqna);
   }  
   
  @Override
  public int delete(int no) {
    return hostQnaDao.delete(no);
  }
  //  
  //  @Override
  //  public int size() {
  //    return qnaDao.countAll();
  //  }
}







