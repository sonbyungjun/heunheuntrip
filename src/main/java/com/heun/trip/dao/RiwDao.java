package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Riw;

public interface RiwDao {
  int insert(Riw riw);
  List<Riw> findAll(Map<String,Object> params);
  Riw findByNo(int no);
//// int increaseCount(int no);  
  int delete(int no);   
 int update(Riw riw);   
 int countAll(); 
//  List<Qna> findByReList(Map<String,Object> params);
//  List<Category> getCategory();
//  int maxParent();
//  int maxOrder(int parent);
//  int sorting(Map<String,Object> params);
//  List<Qna> deleteList(Map<String,Object> params); 
}





