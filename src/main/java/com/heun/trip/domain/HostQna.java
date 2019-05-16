package com.heun.trip.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class HostQna implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private int userNo;
  private int roomNo;
  private String content;
  @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd")
  private Date createdDate;
  private String photo;
  private String name;
  private int authNo;
  private String auth;
  
  @Override
  public String toString() {
    return "HostQna [no=" + no + ", userNo=" + userNo + ", roomNo=" + roomNo + ", content="
        + content + ", createdDate=" + createdDate + ", photo=" + photo + ", name=" + name
        + ", authNo=" + authNo + ", auth=" + auth + "]";
  }
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getUserNo() {
    return userNo;
  }
  public void setUserNo(int userNo) {
    this.userNo = userNo;
  }
  public int getRoomNo() {
    return roomNo;
  }
  public void setRoomNo(int roomNo) {
    this.roomNo = roomNo;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public int getAuthNo() {
    return authNo;
  }
  public void setAuthNo(int authNo) {
    this.authNo = authNo;
  }
  public String getAuth() {
    return auth;
  }
  public void setAuth(String auth) {
    this.auth = auth;
  }
  
  
 
 
  
  
  
}
