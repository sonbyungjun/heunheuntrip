package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.QnaDao;
import com.heun.trip.dao.QnaPhotoDao;
import com.heun.trip.domain.Category;
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
  
  @Override
  public Qna get(int no) {
    return qnaDao.findByNo(no);
  }
  
  @Override
  public List<Qna> reList(int parent,  int step) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("parent", parent);
    params.put("step", step);
    return qnaDao.findByReList(params);
  }
  
  @Override
  public List<Category> getCategory() {
    return qnaDao.getCategory();
  }
  
  @Override
  public int add(Qna qna) {
    int count = qnaDao.insert(qna);
    return count;
  }
  
  @Override
  public int maxParent() {
    return qnaDao.maxParent();
  }
  
  @Override
  public int maxOrder(int parent) {
    return qnaDao.maxOrder(parent);
  }
  
  @Override
  public int sorting(int parent, int order) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("parent", parent);
    params.put("order", order);
    return qnaDao.sorting(params);
  }
}







