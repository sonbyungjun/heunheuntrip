package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Hostqna;

public interface HostqnaService {
  List<Hostqna> list(int pageNo, int pageSize);
  int add(Hostqna hostQna);
  Hostqna get(int no);
  int update(Hostqna hostQna);   
  int delete(int no);
//  int size();
}
