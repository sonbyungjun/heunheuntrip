package com.heun.trip.service.impl;

import java.util.List;
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
  public List<Rev> list() {
    return revDao.findAll();
  }
  
}







