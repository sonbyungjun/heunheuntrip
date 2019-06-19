package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.HostQna;

public interface HostQnaService {
  int add(HostQna hostqna);
  int delete(int no);
  int size();
  List<HostQna> HostList(int no);
}
