package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.RiwDao;
import com.heun.trip.domain.Riw;
import com.heun.trip.service.RiwService;

@Service
public class RiwServiceImpl implements RiwService {

  RiwDao riwDao;

  public RiwServiceImpl(RiwDao riwDao ) {
    this.riwDao = riwDao;
  }

  @Override
  public List<Riw> list(int pageNo, int pageSize) {

    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);

    return riwDao.findAll(params);
  }
  
  @Override
  public List<Riw> listMypage(int pageNo, int pageSize, int userNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("userNo", userNo);
    
    return riwDao.findAllMypage(params);
  }

  @Override
  public int size() {
    return riwDao.countAll();
  }

  @Override
  public int add(Riw riw) {
    int count = riwDao.insert(riw);
    return count;
  }
  @Override
  public Riw get(int no) {
    return riwDao.findByNo(no);
  }

  @Override
  public int delete(int no) {
    return riwDao.delete(no);
  }

  @Override
  public int update(Riw riw) {
    return riwDao.update(riw);
  }
  
  @Override
  public int count(Map<String, Object> params) {
    return count(params);
  }

  //  
  //  @Override
  //  public List<Qna> reList(int parent,  int step) {
  //    HashMap<String,Object> params = new HashMap<>();
  //    params.put("parent", parent);
  //    params.put("step", step);
  //    return qnaDao.findByReList(params);
  //  }
  //  
  //  @Override
  //  public List<Category> getCategory() {
  //    return qnaDao.getCategory();
  //  }
  //  
  //  
  //  @Override
  //  public int maxParent() {
  //    return qnaDao.maxParent();
  //  }
  //  
  //  @Override
  //  public int maxOrder(int parent) {
  //    return qnaDao.maxOrder(parent);
  //  }
  //  
  //  @Override
  //  public int sorting(int parent, int order) {
  //    HashMap<String,Object> params = new HashMap<>();
  //    params.put("parent", parent);
  //    params.put("order", order);
  //    return qnaDao.sorting(params);
  //  }
  //  
  //  
  //  @Override
  //  public int update(Qna qna) {
  //    return qnaDao.update(qna);
  //  }
  //  
  //  @Override
  //  public int delete(int no, int parent, int order) {
  //    HashMap<String,Object> params = new HashMap<>();
  //    params.put("parent", parent);
  //    params.put("order", order);
  //    Qna qna = qnaDao.findByNo(no);
  //    int step = qna.getStep();
  //    List<Qna> deleteList = qnaDao.deleteList(params);
  //    
  //    // 원글을 먼저 지운다.
  //    for (QnaPhoto p : qna.getQnaPhotos()) {
  //      qnaPhotoDao.deleteByPQnaPhotoNo(p.getNo());
  //    }
  //    qnaDao.delete(qna.getQnaNo());
  //    
  //    int count = 0;
  //    
  //    // 원글의 자식 글을 지운다.
  //    for (Qna q : deleteList) {
  //      if (q.getStep() == step) {
  //        break;
  //      }
  //      for (QnaPhoto p : q.getQnaPhotos()) {
  //        qnaPhotoDao.deleteByPQnaPhotoNo(p.getNo());
  //      }
  //      qnaDao.delete(q.getQnaNo());
  //      count++;
  //    }
  //    
  //    return count;
  //  }

}







