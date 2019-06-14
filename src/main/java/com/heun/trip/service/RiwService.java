package com.heun.trip.service;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Riw;

public interface RiwService {
  List<Riw> list(int pageNo, int pageSize);
  List<Riw> listMypage(int pageNo, int pageSize, int userNo);
  List<Riw> hostlistMypage(int pageNo, int pageSize, int userNo);
  int add(Riw riw);
  int addriw(Riw riw);
  Riw get(int no);
  int update(Riw riw);   
  int replyupdate(Riw riw);   
  int delete(int no);
  int size();
  int reviewsize(int no);
  int count(Map<String, Object> params);
  int countAllHost(int no);
  List<Riw> roomreview(int no, int pageNo, int pageSize) ;
}
