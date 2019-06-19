package com.heun.trip.service.impl;

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
  
  @Override
  public List<HostQna> HostList(int no) {
    return hostqnaDao.findByHostqnaList(no);
  }

}







