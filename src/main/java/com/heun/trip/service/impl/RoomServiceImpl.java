package com.heun.trip.service.impl;
  
import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.RoomDao;
import com.heun.trip.dao.RoomFileDao;
import com.heun.trip.domain.Convenience;
import com.heun.trip.domain.Room;
import com.heun.trip.domain.RoomFile;
import com.heun.trip.domain.Safety;
import com.heun.trip.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {
  
  RoomDao roomDao;
  RoomFileDao roomFileDao;
  
  public RoomServiceImpl(RoomDao roomDao, RoomFileDao roomFileDao) {
    this.roomDao = roomDao;
    this.roomFileDao = roomFileDao;
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
    
    List<RoomFile> files = room.getPhotos();
    for (RoomFile f : files) {
      f.setRoomNo(room.getNo());
    }
    roomFileDao.insert(files);
    
    return 1;
  }
  
  @Override
  public List<Room> list(int pageNo, int pageSize, String lati, String longi) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("lati", lati);
    params.put("longi", longi);
    List<Room> rooms = roomDao.findAll(params);
    return rooms;
  }
  
  @Override
  public int size(String lati, String longi) {
    HashMap<String,Object> params = new HashMap<>();
    params.put("lati", lati);
    params.put("longi", longi);
    return roomDao.countAll(params);
  }
  
  @Override
  public Room get(int no) {
    return roomDao.findByNo(no);
  }
}
