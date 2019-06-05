package com.heun.trip.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Riw { // 일반회원이나 호스트가 관리자에게 문의하는 게시판 도메인
  private int no;
  private int userNo;
  private String  contents;
  private String grd;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  private String reply;
  private Date replyDate;
  private int roomNo;
  private String name;
  private String photo;
  
  
  
  
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
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
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  public String getGrd() {
    return grd;
  }
  public void setGrd(String grd) {
    this.grd = grd;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  public String getReply() {
    return reply;
  }
  public void setReply(String reply) {
    this.reply = reply;
  }
  public Date getReplyDate() {
    return replyDate;
  }
  public void setReplyDate(Date replyDate) {
    this.replyDate = replyDate;
  }
  public int getRoomNo() {
    return roomNo;
  }
  public void setRoomNo(int roomNo) {
    this.roomNo = roomNo;
  }
  @Override
  public String toString() {
    return "Riw [no=" + no + ", userNo=" + userNo + ", contents=" + contents + ", grd=" + grd
        + ", createdDate=" + createdDate + ", reply=" + reply + ", replyDate=" + replyDate
        + ", roomNo=" + roomNo + ", name=" + name + ", photo=" + photo + "]";
  }
 
 
  
  
  
}
