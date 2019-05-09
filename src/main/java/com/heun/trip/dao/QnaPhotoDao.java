package com.heun.trip.dao;

import java.util.List;
import com.heun.trip.domain.QnaPhoto;

public interface QnaPhotoDao {
  int insert(List<QnaPhoto> qnaPhotos);
  List<QnaPhoto> findByQnaPhotoNo(int QnaPhotoFiles);
  int deleteByPQnaPhotoNo(int QnaPhotoFiles);
}
