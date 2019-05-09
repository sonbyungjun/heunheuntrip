package com.heun.trip.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Member {

  private int no;
  private String email;
  private String password;
  private String name;
  private String tel;
  private String photo;
  private String auth;
  
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  
  @Override
  public String toString() {
    return "Member [no=" + no + ", email=" + email + ", password=" + password + ", name=" + name
        + ", tel=" + tel + ", photo=" + photo + ", auth=" + auth + ", createdDate=" + createdDate
        + "]";
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getTel() {
    return tel;
  }
  public void setTel(String tel) {
    this.tel = tel;
  }
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  public String getAuth() {
    return auth;
  }
  public void setAuth(String auth) {
    this.auth = auth;
  }
  
  
  
}
