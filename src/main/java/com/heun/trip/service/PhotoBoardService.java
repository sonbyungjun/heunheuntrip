package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.PhotoBoard;

public interface PhotoBoardService {
  List<PhotoBoard> list(int pageNo, int pageSize, String search);
  int add(PhotoBoard board);
  PhotoBoard get(int no);
  int update(PhotoBoard board);
  int delete(int no);
  int size(String search);
}
