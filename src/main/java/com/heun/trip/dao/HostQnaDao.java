package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.HostQna;

public interface HostQnaDao {
  int insert(HostQna qna);
  List<HostQna> findAll(Map<String,Object> params);
//  Hostqna findByNo(int no);
 // int update(Hostqna qna); 
  int delete(int no);  
  int countAll(); 
}







