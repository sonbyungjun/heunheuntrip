package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.QnaDao;
import com.heun.trip.domain.Category;
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
    qnaDao.increaseCount(no);
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
  
  
  @Override
  public int update(Qna qna) {
    return qnaDao.update(qna);
  }
  
  @Override
  public int delete(int no, int parent, int order) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("parent", parent);
    params.put("order", order);
    Qna qna = qnaDao.findByNo(no);
    int step = qna.getStep();
    List<Qna> deleteList = qnaDao.deleteList(params);
    

    qnaDao.delete(qna.getQnaNo());
    
    int count = 0;
    
    // 원글의 자식 글을 지운다.
    for (Qna q : deleteList) {
      if (q.getStep() == step) {
        break;
      }

      qnaDao.delete(q.getQnaNo());
      count++;
    }
    
    return count;
  }

  @Override
  public List<Qna> search(String name, String title) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("name", name);
    params.put("title", title);
    return qnaDao.findByKeyword(params);
  }

  @Override
  public int password(int qnaNo, String pwd) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("qnaNo", qnaNo);
    params.put("pwd", pwd);
    return qnaDao.password(params);
  }

  @Override
  public int pwdCheck(int qnaNo) {
    return qnaDao.passwordCheck(qnaNo);
  }
      
}







