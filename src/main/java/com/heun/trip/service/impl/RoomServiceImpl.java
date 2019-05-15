package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.RoomDao;
import com.heun.trip.domain.Room;
import com.heun.trip.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {
  
  RoomDao roomDao;
  
  public RoomServiceImpl(RoomDao roomDao) {
    this.roomDao = roomDao;
  }
  
  @Override
  public List<Room> list(int pageNo, int pageSize) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    List<Room> rooms = roomDao.findAll(params);
    return rooms;
  }
  
  @Override
  public int size() {
    return roomDao.countAll();
  }
  
  @Override
  public Room get(int no) {
    return roomDao.findByNo(no);
  }
}
