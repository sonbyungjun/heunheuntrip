package com.heun.trip.domain;

import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Room {
  
  private int no;
  private String name;
  private int price;
  private int maxPerson;
  private String postNo;
  private String address;
  private String detailAddress;
  private String latitude;
  private String longitude;
  private String rule;
  private String map;
  private String cancelGuide;
  private String penaltyGuide;
  private int grade;
  private String thumbnail;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  
  private Member host;
  private List<Facilities> Facilities;
  private List<RoomFile> photos;
  
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
  public int getPrice() {
    return price;
  }
  public void setPrice(int price) {
    this.price = price;
  }
  public int getMaxPerson() {
    return maxPerson;
  }
  public void setMaxPerson(int maxPerson) {
    this.maxPerson = maxPerson;
  }
  public String getPostNo() {
    return postNo;
  }
  public void setPostNo(String postNo) {
    this.postNo = postNo;
  }
  public String getAddress() {
    return address;
  }
  public void setAddress(String address) {
    this.address = address;
  }
  public String getDetailAddress() {
    return detailAddress;
  }
  public void setDetailAddress(String detailAddress) {
    this.detailAddress = detailAddress;
  }
  public String getLatitude() {
    return latitude;
  }
  public void setLatitude(String latitude) {
    this.latitude = latitude;
  }
  public String getLongitude() {
    return longitude;
  }
  public void setLongitude(String longitude) {
    this.longitude = longitude;
  }
  public String getRule() {
    return rule;
  }
  public void setRule(String rule) {
    this.rule = rule;
  }
  public String getMap() {
    return map;
  }
  public void setMap(String map) {
    this.map = map;
  }
  public String getCancelGuide() {
    return cancelGuide;
  }
  public void setCancelGuide(String cancelGuide) {
    this.cancelGuide = cancelGuide;
  }
  public String getPenaltyGuide() {
    return penaltyGuide;
  }
  public void setPenaltyGuide(String penaltyGuide) {
    this.penaltyGuide = penaltyGuide;
  }
  public int getGrade() {
    return grade;
  }
  public void setGrade(int grade) {
    this.grade = grade;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  public Member getHost() {
    return host;
  }
  public void setHost(Member host) {
    this.host = host;
  }
  public List<Facilities> getFacilities() {
    return Facilities;
  }
  public void setFacilities(List<Facilities> facilities) {
    Facilities = facilities;
  }
  public List<RoomFile> getPhotos() {
    return photos;
  }
  public void setPhotos(List<RoomFile> photos) {
    this.photos = photos;
  }
  public String getThumbnail() {
    return thumbnail;
  }
  public void setThumbnail(String thumbnail) {
    this.thumbnail = thumbnail;
  }
  @Override
  public String toString() {
    return "Room [no=" + no + ", name=" + name + ", price=" + price + ", maxPerson=" + maxPerson
        + ", postNo=" + postNo + ", address=" + address + ", detailAddress=" + detailAddress
        + ", latitude=" + latitude + ", longitude=" + longitude + ", rule=" + rule + ", map=" + map
        + ", cancelGuide=" + cancelGuide + ", penaltyGuide=" + penaltyGuide + ", grade=" + grade
        + ", thumbnail=" + thumbnail + ", createdDate=" + createdDate + ", host=" + host
        + ", Facilities=" + Facilities + ", photos=" + photos + "]";
  }
}
