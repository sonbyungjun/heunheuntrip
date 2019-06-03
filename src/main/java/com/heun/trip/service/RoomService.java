package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Room;

public interface RoomService {
  List<Room> list(int pageNo, int pageSize, String lati, String longi);
  int size(String lati, String longi);
  Room get(int no);
  int add(Room room);
}
