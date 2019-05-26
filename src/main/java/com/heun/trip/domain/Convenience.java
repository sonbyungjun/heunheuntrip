package com.heun.trip.domain;

public class Convenience {

  private int no;
  private String name;

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "convenience [no=" + no + ", name=" + name + "]";
  }

}
