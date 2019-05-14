package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Category;
import com.heun.trip.domain.Qna;
    
public interface QnaService {
  List<Qna> list(int pageNo, int pageSize);
  int add(Qna qna);    
  Qna get(int no);
  List<Qna> reList(int parent, int step);

  int update(Qna qna);   
//  int delete(int no);
  int size();
  List<Category> getCategory();
  int maxParent();
  int maxOrder(int parent);
  int sorting(int parent, int order);
}
