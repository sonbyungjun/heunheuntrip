package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Riw;

public interface RiwService {
  List<Riw> list(int pageNo, int pageSize);
 int add(Riw riw);
 Riw get(int no);
//  List<Qna> reList(int parent, int step);
  int update(Riw riw);   
  int delete(int no);
 int size();
//  List<Category> getCategory();
//  int maxParent();
//  int maxOrder(int parent);
//  int sorting(int parent, int order);
}
