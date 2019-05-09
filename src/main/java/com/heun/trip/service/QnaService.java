package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Qna;

public interface QnaService {
  List<Qna> list(int pageNo, int pageSize);
//  int add(Qna qna);
//  Qna get(int no);
//  int update(Qna qna);
//  int delete(int no);
//  int size();
}
