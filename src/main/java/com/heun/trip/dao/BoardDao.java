package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Board;

public interface BoardDao {
  int insert(Board board);
  List<Board> findAll(Map<String,Object> params);
  Board findByNo(int no);
  int increaseCount(int no);
  int update(Board board);
  int delete(int no);
  int countAll();
}







