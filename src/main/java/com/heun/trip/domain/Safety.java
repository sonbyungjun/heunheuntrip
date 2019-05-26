package com.heun.trip.domain;

public class Safety {
  private int no;
  private String safety;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getSafety() {
    return safety;
  }
  public void setSafety(String safety) {
    this.safety = safety;
  }
  @Override
  public String toString() {
    return "safety [no=" + no + ", safety=" + safety + "]";
  }
  
  
}
