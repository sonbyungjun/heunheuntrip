package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Riw;

public interface RiwDao {
  int insert(Riw riw);
  List<Riw> findAll(Map<String,Object> params);
  Riw findByNo(int no);
  int delete(int no);   
  int update(Riw riw);   
  int countAll();
  int count(Map<String, Object> params);
}





