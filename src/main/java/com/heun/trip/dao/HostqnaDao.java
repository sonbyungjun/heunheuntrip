package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Hostqna;

public interface HostqnaDao {
  int insert(Hostqna qna);
  List<Hostqna> findAll(Map<String,Object> params);
  Hostqna findByNo(int no);
  int increaseCount(int no);  
  int update(Hostqna qna); 
  int delete(int no);  
//  int countAll(); 
}







