package com.heun.trip.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Rev {
  private int no;
  private int userNo;
  private int stusNo;
  private int rmsNo;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date checkIn;

  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date checkOut;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  private String revStus;
  private String stanBy;
  private int revPerson;
  
  private String rmsName;
  private String address;
  private String thumbnail;
  private String status;
  
  public String getRmsName() {
    return rmsName;
  }
  public void setRmsName(String rmsName) {
    this.rmsName = rmsName;
  }
  public String getAddress() {
    return address;
  }
  public void setAddress(String address) {
    this.address = address;
  }
  public String getThumbnail() {
    return thumbnail;
  }
  public void setThumbnail(String thumbnail) {
    this.thumbnail = thumbnail;
  }
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
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
  public int getStusNo() {
    return stusNo;
  }
  public void setStusNo(int stusNo) {
    this.stusNo = stusNo;
  }
  public int getRmsNo() {
    return rmsNo;
  }
  public void setRmsNo(int rmsNo) {
    this.rmsNo = rmsNo;
  }
  public Date getCheckIn() {
    return checkIn;
  }
  public void setCheckIn(Date checkIn) {
    this.checkIn = checkIn;
  }
  public Date getCheckOut() {
    return checkOut;
  }
  public void setCheckOut(Date checkOut) {
    this.checkOut = checkOut;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  public String getRevStus() {
    return revStus;
  }
  public void setRevStus(String revStus) {
    this.revStus = revStus;
  }
  public String getStanBy() {
    return stanBy;
  }
  public void setStanBy(String stanBy) {
    this.stanBy = stanBy;
  }
  public int getRevPerson() {
    return revPerson;
  }
  public void setRevPerson(int revPerson) {
    this.revPerson = revPerson;
  }
  
  @Override
  public String toString() {
    return "Rev [no=" + no + ", userNo=" + userNo + ", stusNo=" + stusNo + ", rmsNo=" + rmsNo
        + ", checkIn=" + checkIn + ", checkOut=" + checkOut + ", createdDate=" + createdDate
        + ", revStus=" + revStus + ", stanBy=" + stanBy + ", revPerson=" + revPerson + ", rmsName="
        + rmsName + ", address=" + address + ", thumbnail=" + thumbnail + ", status=" + status
        + "]";
  }
  
}
