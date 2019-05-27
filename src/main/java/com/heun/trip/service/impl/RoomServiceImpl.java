package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.RoomDao;
import com.heun.trip.domain.Convenience;
import com.heun.trip.domain.Room;
import com.heun.trip.domain.Safety;
import com.heun.trip.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {
  
  RoomDao roomDao;
  
  public RoomServiceImpl(RoomDao roomDao) {
    this.roomDao = roomDao;
  }
  
  @Override
  public int add(Room room) {
    
    roomDao.insert(room);
    
    List<Convenience> cons = room.getConveniences();
    for (Convenience c : cons) {
      c.setRoomNo(room.getNo());
    }
    roomDao.insertConvenience(cons);
    
    List<Safety> safes = room.getSafeties();
    for (Safety s : safes) {
      s.setRoomNo(room.getNo());
    }
    roomDao.insertSafety(safes);
    
    return 1;
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
