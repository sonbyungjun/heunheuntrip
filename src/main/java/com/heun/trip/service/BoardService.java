package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Board;

public interface BoardService {
  List<Board> list(int pageNo, int pageSize);
  int add(Board board);
  Board get(int no);
  int update(Board board);
  int delete(int no);
  int size();
}
