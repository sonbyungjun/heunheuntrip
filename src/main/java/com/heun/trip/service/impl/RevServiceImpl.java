package com.heun.trip.service.impl;

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
  public List<Rev> list() {
    return revDao.findAll();
  }

  @Override
  public int count(Map<String, Object> params) {
    return revDao.count(params);
  }


}







