package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.QnaDao;
import com.heun.trip.domain.Qna;
import com.heun.trip.service.QnaService;

@Service
public class QnaServiceImpl implements QnaService {

  QnaDao qnaDao;

  public QnaServiceImpl(QnaDao qnaDao) {
    this.qnaDao = qnaDao;
  }

  @Override
  public List<Qna> list(int pageNo, int pageSize) {

    HashMap<String,Object> params = new HashMap<>();
    //    params.put("size", pageSize);
    //    params.put("rowNo", (pageNo - 1) * pageSize);
    //    
    return qnaDao.findAll(params);
  }

  @Override
  public int add(Qna qna) {
    
    return qnaDao.insert(qna);
  }

  @Override
  public Qna get(int no) {
    Qna qna = qnaDao.findByNo(no);
    if (qna != null) {
      qnaDao.increaseCount(no);
    }
    return qna;
  }
  //  
  //  @Override
  //  public int update(Qna qna) {
  //    return qnaDao.update(qna);
  //  }  
  //  
  @Override
  public int delete(int no) {
    return qnaDao.delete(no);
  }
  //  
  //  @Override
  //  public int size() {
  //    return qnaDao.countAll();
  //  }
}







