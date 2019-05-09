package com.heun.trip.domain;
import java.io.Serializable;
import java.sql.Date;

public class Qna implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private String title;
  private String content;
  private String password;
  private Date createdDate;
  private int viewCount;
  private int userNo;
  private int categoryNo;
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  public int getViewCount() {
    return viewCount;
  }
  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }
  public int getUserNo() {
    return userNo;
  }
  public void setUserNo(int userNo) {
    this.userNo = userNo;
  }
  public int getCategoryNo() {
    return categoryNo;
  }
  public void setCategoryNo(int categoryNo) {
    this.categoryNo = categoryNo;
  }
  
  
  
  @Override
  public String toString() {
    return "Qna [no=" + no + ", title=" + title + ", content=" + content + ", password=" + password
        + ", createdDate=" + createdDate + ", viewCount=" + viewCount + ", userNo=" + userNo
        + ", categoryNo=" + categoryNo + "]";
  }
  
  
  
  
  
}
