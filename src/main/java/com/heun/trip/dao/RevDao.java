package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Rev;

public interface RevDao {
  List<Rev> findAll(Map<String, Object> params);
  int count(Map<String, Object> params);
  int countAll(int no);
  Rev findByNo(int no);
  int delete(int no);
  int inupdate(Rev rev);
  List<Rev> getupdtData(Map<String, Object> params);
  int requestDelete(int no);
}
 




