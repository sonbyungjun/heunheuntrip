package com.heun.trip.domain;

public class Bookmark {
  private int userNo;
  private int roomNo;
  private String memo;
  
  private String roomPhoto;
  private String roomName;
  private String roomAddr;
  
  
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
  public String getMemo() {
    return memo;
  }
  public void setMemo(String memo) {
    this.memo = memo;
  }
  public String getRoomPhoto() {
    return roomPhoto;
  }
  public void setRoomPhoto(String roomPhoto) {
    this.roomPhoto = roomPhoto;
  }
  public String getRoomName() {
    return roomName;
  }
  public void setRoomName(String roomName) {
    this.roomName = roomName;
  }
  public String getRoomAddr() {
    return roomAddr;
  }
  public void setRoomAddr(String roomAddr) {
    this.roomAddr = roomAddr;
  }
  
  @Override
  public String toString() {
    return "Bookmark [userNo=" + userNo + ", roomNo=" + roomNo + ", memo=" + memo + ", roomPhoto="
        + roomPhoto + ", roomName=" + roomName + ", roomAddr=" + roomAddr + "]";
  }
}
