package com.heun.trip.dao;

import java.util.List;
import com.heun.trip.domain.PhotoFile;

public interface PhotoFileDao {
  int insert(List<PhotoFile> photoFiles);
  List<PhotoFile> findByPhotoBoardNo(int photoBoardNo);
  int deleteByPhotoBoardNo(int photoBoardNo);
}
