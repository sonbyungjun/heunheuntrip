package com.heun.trip.domain;

public class RoomFile {
  private int no;
  private int RoomNo;
  private String path;
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getRoomNo() {
    return RoomNo;
  }
  public void setRoomNo(int roomNo) {
    RoomNo = roomNo;
  }
  public String getPath() {
    return path;
  }
  public void setPath(String path) {
    this.path = path;
  }
  @Override
  public String toString() {
    return "RoomFile [no=" + no + ", RoomNo=" + RoomNo + ", path=" + path + "]";
  }
}
