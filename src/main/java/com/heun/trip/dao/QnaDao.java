package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Qna;

public interface QnaDao {
  int insert(Qna qna);
  List<Qna> findAll(Map<String,Object> params);
  Qna findByNo(int no);
  int increaseCount(int no);
//  int update(Qna qna);
  int delete(int no);
//  int countAll();
}







