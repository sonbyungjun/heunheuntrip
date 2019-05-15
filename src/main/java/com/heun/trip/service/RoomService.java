package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Room;

public interface RoomService {
  List<Room> list(int pageNo, int pageSize);
  int size();
  Room get(int no);
}
