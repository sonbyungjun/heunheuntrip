package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Rev;

public interface RevDao {
  List<Rev> findAll();
  int count(Map<String, Object> params);
}





