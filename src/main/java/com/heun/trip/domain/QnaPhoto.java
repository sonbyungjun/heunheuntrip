package com.heun.trip.domain;

import java.io.Serializable;

public class QnaPhoto implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private int no;
  private String qnaFile;
  private int qnaNo;
 
  @Override
  public String toString() {
    return "QnaPhoto [no=" + no + ", qnaFile=" + qnaFile + ", qnaNo=" + qnaNo + "]";
  }
  
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getQnaFile() {
    return qnaFile;
  }
  public void setQnaFile(String qnaFile) {
    this.qnaFile = qnaFile;
  }
  public int getQnaNo() {
    return qnaNo;
  }
  public void setQnaNo(int qnaNo) {
    this.qnaNo = qnaNo;
  }
  

}
