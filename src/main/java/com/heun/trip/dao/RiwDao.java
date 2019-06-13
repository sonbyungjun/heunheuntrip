package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Riw;

public interface RiwDao {
  int insert(Riw riw);
  int riwinsert(Riw riw);
  List<Riw> findAll(Map<String,Object> params);
  List<Riw> findAllMypage(Map<String,Object> params);
  List<Riw> findAllhostMypage(Map<String,Object> params);
  Riw findByNo(int no);
  int delete(int no);   
  int update(Riw riw); 
  int replyupdate(Riw riw);
  int countAll();
  int count(Map<String, Object> params);
  int countAllHost(int no);
  List<Riw> findroomreview(int no);
}





