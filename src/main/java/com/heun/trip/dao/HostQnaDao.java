package com.heun.trip.dao;

import java.util.List;
import com.heun.trip.domain.HostQna;

public interface HostQnaDao {
  int insert(HostQna qna);
  int delete(int no);  
  int countAll();
  List<HostQna> findByHostqnaList(int no); 
}







