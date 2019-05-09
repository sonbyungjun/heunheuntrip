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
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    
    return qnaDao.findAll(params);
  }
//  
//  @Override
//  public int add(Qna board) {
//    // 이 메서드도 하는 일이 없다.
//    // 그래도 일관된 프로그래밍을 위해 Command 객체는 항상 Service 객체를 경유하여 DAO를 사용해야 한다.
//    return qnaDao.insert(board);
//  }
//  
//  @Override
//  public Qna get(int no) {
//    // 이제 조금 서비스 객체가 뭔가를 하는 구만.
//    // Command 객체는 데이터를 조회한 후 조회수를 높이는 것에 대해 신경 쓸 필요가 없어졌다.
//    Qna board = qnaDao.findByNo(no);
//    if (board != null) {
//      qnaDao.increaseCount(no);
//    }
//    return board;
//  }
//  
//  @Override
//  public int update(Qna board) {
//    // 이 메서드도 별로 할 일이 없다.
//    // 그냥 DAO를 실행시키고 리턴 값을 그대로 전달한다.
//    return qnaDao.update(board);
//  }
//  
//  @Override
//  public int delete(int no) {
//    // 이 메서드도 그냥 DAO에 명령을 전달하는 일을 한다.
//    // 그래도 항상 Command 객체는 이 Service 객체를 통해서 데이터를 처리해야 한다.
//    return qnaDao.delete(no);
//  }
  
//  @Override
//  public int size() {
//    // 전체 게시물의 개수
//    return qnaDao.countAll();
//  }
}







