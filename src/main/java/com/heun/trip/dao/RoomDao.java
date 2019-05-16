package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Room;

public interface RoomDao {
//  int insert(Member member);
  List<Room> findAll(Map<String,Object> paramMap);
  Room findByNo(int no);
//  Member findByEmailPassword(Map<String,Object> paramMap);
//  int update(Member member);
//  int delete(int no);
  int countAll();
}
