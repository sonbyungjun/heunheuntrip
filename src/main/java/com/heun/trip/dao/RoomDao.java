package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Convenience;
import com.heun.trip.domain.Room;
import com.heun.trip.domain.Safety;

public interface RoomDao {
  int insert(Room room);
  int insertConvenience(List<Convenience> Conveniences);
  int insertSafety(List<Safety> safeties);
  
  List<Room> findAll(Map<String,Object> paramMap);
  Room findByNo(int no);
//  Member findByEmailPassword(Map<String,Object> paramMap);
//  int update(Member member);
//  int delete(int no);
  int countAll();
}
