package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.HostQna;

public interface HostQnaService {
  List<HostQna> list(int pageNo, int pageSize);
  int add(HostQna hostqna);
 // Faq get(int no);
  //int update(Faq faq);   
  int delete(int no);
  int size();
}
