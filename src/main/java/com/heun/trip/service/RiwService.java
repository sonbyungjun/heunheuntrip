package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Riw;

public interface RiwService {
  List<Riw> list(int pageNo, int pageSize);
 int add(Riw riw);
 Riw get(int no);
  int update(Riw riw);   
  int delete(int no);
 int size();
}