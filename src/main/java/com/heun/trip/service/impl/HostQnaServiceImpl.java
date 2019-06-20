package com.heun.trip.service.impl;

import java.sql.Date;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.HostQnaDao;
import com.heun.trip.dao.MemberDao;
import com.heun.trip.dao.RevDao;
import com.heun.trip.dao.RoomDao;
import com.heun.trip.domain.HostQna;
import com.heun.trip.domain.Member;
import com.heun.trip.domain.Rev;
import com.heun.trip.domain.Room;
import com.heun.trip.service.HostQnaService;

@Service
public class HostQnaServiceImpl implements HostQnaService {

  HostQnaDao hostqnaDao;
  RevDao revDao;
  RoomDao roomDao;
  MemberDao memberDao;

  public HostQnaServiceImpl( HostQnaDao hostqnaDao, RevDao revDao, RoomDao roomDao, MemberDao memberDao) {
    this.memberDao = memberDao;
    this.hostqnaDao = hostqnaDao;
    this.revDao = revDao;
    this.roomDao = roomDao;
  }

  @Override
  public int size() {
    return hostqnaDao.countAll();
  }

  @Override
  public int delete(int no) {
    return hostqnaDao.delete(no);
  }

  @Override
  public int add(HostQna hostqna) {
    return hostqnaDao.insert(hostqna);
  }

  @Override
  public List<HostQna> HostList(int no) {
    return hostqnaDao.findByHostqnaList(no);
  }

  @Override
  public List<HostQna> NewGuestList(int no) {

    List<HostQna> qnas = hostqnaDao.findNewGuestqna(no);

    for(HostQna q : qnas) {
      int revNo = q.getRevNo();

      Rev rev = revDao.findByNo(revNo);
      Date checkIn = rev.getCheckIn();
      Date checkOut = rev.getCheckOut();
      int charge = rev.getRevCharge();
      int rmsNo = rev.getRmsNo();
      Room room = roomDao.findByNo(rmsNo);
      String addr = room.getAddress();
      String name = room.getName();
      String thumb = room.getThumbnail();
      int roomNo = room.getNo();

      q.setCheckIn(checkIn);
      q.setCheckOut(checkOut);
      q.setCharge(charge);
      q.setRoomAddr(addr);
      q.setRoomName(name);
      q.setRoomPhoto(thumb);
      q.setRoomNo(roomNo);

    }

    return qnas;
  }

  @Override
  public List<HostQna> NewHostList(int no) {
    List<HostQna> qnas = hostqnaDao.findNewHostqna(no);

    for(HostQna q : qnas) {
      int revNo = q.getRevNo();

      Rev rev = revDao.findByNo(revNo);
      Date checkIn = rev.getCheckIn();
      Date checkOut = rev.getCheckOut();
      int charge = rev.getRevCharge();
      int rmsNo = rev.getRmsNo();
      int userNo = rev.getUserNo();
      
      Member member = memberDao.findByNo(userNo);
      String userName = member.getName();
      String userPhoto = member.getPhoto();
      
      Room room = roomDao.findByNo(rmsNo);
      String addr = room.getAddress();
      String name = room.getName();
      String thumb = room.getThumbnail();
      int roomNo = room.getNo();

      q.setCheckIn(checkIn);
      q.setCheckOut(checkOut);
      q.setCharge(charge);
      q.setRoomAddr(addr);
      q.setRoomName(name);
      q.setRoomPhoto(thumb);
      q.setRoomNo(roomNo);
      q.setUserName(userName);
      q.setUserPhoto(userPhoto);

    }

    return qnas;
  }

}







