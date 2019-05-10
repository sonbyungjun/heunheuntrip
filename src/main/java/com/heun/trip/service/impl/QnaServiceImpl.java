package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.QnaDao;
import com.heun.trip.dao.QnaPhotoDao;
import com.heun.trip.domain.Qna;
import com.heun.trip.service.QnaService;

@Service
public class QnaServiceImpl implements QnaService {

  QnaDao qnaDao;
  QnaPhotoDao qnaPhotoDao;

  public QnaServiceImpl(QnaDao qnaDao, QnaPhotoDao qnaPhotoDao) {
    this.qnaDao = qnaDao;
    this.qnaPhotoDao = qnaPhotoDao;
  }

  @Override
  public List<Qna> list(int pageNo, int pageSize) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    
    return qnaDao.findAll(params);
  }

  @Override
  public int size() {
    return qnaDao.countAll();
  }
}







