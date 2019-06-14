package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.conf.Sms;
import com.heun.trip.domain.Member;
import com.heun.trip.domain.Rev;
import com.heun.trip.service.MemberService;
import com.heun.trip.service.RevService;
import com.heun.trip.service.RoomService;


@RestController("json/RevController")
@RequestMapping("/json/rev")
public class RevController {

  RevService revService;
  MemberService memberService;
  RoomService roomService;
  Sms sms;

  public RevController(RevService revService, MemberService memberService, RoomService roomService, Sms sms) {
    this.revService = revService;
    this.memberService = memberService;
    this.roomService = roomService;
    this.sms = sms;
  }
  
  @PostMapping("add")
  public Object add(Rev rev, HttpSession session) {
    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    
    int userNo = loginUser.getNo();
    rev.setUserNo(userNo);
    
    Rev revs = revService.detail(rev.getRevUpdate());
    System.out.println(revs);
    rev.setStusNo(revs.getStusNo());
    rev.setRmsNo(revs.getRmsNo());
    rev.setRevStus(revs.getRevStus());
    rev.setStanBy(revs.getStanBy());
    rev.setRevCharge(revs.getRevCharge());
    
    System.out.println(" 결론 ------>  " + rev);
    try {
      revService.inupdate(rev);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("addsms")
  public Object addsms(int roomNo, HttpSession session) {
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    String guestName = loginUser.getName();
    String tel = memberService.getTel(roomNo);
    String roomName = roomService.getRoom(roomNo);
    
    String messageText = roomName + " 숙소의 " + guestName + "님의 예약 변경 요청.";
    try {
      sms.smsSend(tel, messageText);
    } catch (Exception e) {
      e.printStackTrace();
    }

    HashMap<String,Object> content = new HashMap<>();
    
    return content;
  }
  
  @GetMapping("cancelsms")
  public Object cancelsms(int roomNo, HttpSession session) {
    
    Member loginUser = (Member) session.getAttribute("loginUser");
    String guestName = loginUser.getName();
    String tel = memberService.getTel(roomNo);
    String roomName = roomService.getRoom(roomNo);
    
    String messageText = roomName + " 숙소의 " + guestName + "님의 예약 취소 요청. ";
    try {
      sms.smsSend(tel, messageText);
    } catch (Exception e) {
      e.printStackTrace();
    }

    HashMap<String,Object> content = new HashMap<>();
    
    return content;
  }

  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize, 
      HttpSession session
      ) { 
    Member member = (Member)session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<>();
    
    int userNo = member.getNo();

    if (pageSize < 1 || pageSize > 6) 
      pageSize = 5;

    int rowCount = revService.size(userNo);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;


    try {
      List<Rev> reservation = revService.list(pageNo, pageSize, userNo);

      for(Rev r : reservation) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("userNo", r.getUserNo());
        params.put("roomNo", r.getRmsNo());

        int no = revService.count(params);

        System.out.println(no);

        if(no == 1) {
          r.setCount(true);
        }
      }

      content.put("list", reservation);
      content.put("pageNo", pageNo);
      content.put("pageSize", pageSize);
      content.put("totalPage", totalPage);
    } catch (Exception e) {
      content.put("fail", "예약 목록이 없습니다.");
    }

    return content;
  }
  
  
  @GetMapping("listInHostPage")
  public Object listInHostPage(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize, 
      HttpSession session
      ) { 
    Member member = (Member)session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<>();
    
    int userNo = member.getNo();

    if (pageSize < 1 || pageSize > 6) 
      pageSize = 5;

    int rowCount = revService.countInHostPage(userNo);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;


    try {
      List<Rev> reservation = revService.listInHostPage(pageNo, pageSize, userNo);

      
      content.put("list", reservation);
      content.put("pageNo", pageNo);
      content.put("pageSize", pageSize);
      content.put("totalPage", totalPage);
    } catch (Exception e) {
      content.put("fail", "예약 목록이 없습니다.");
    }

    return content;
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
    Rev rev = revService.detail(no);
    HashMap<String,Object> content = new HashMap<>();
    content.put("rev", rev);
  
    return content;
  }
  
  @GetMapping("listup")
  public Object listup(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize, 
      HttpSession session
      ) {
    
    Member member = (Member)session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<>();
    
    int userNo = member.getNo();

    if (pageSize < 1 || pageSize > 6) 
      pageSize = 5;

    int rowCount = revService.size(userNo);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;


    try {
      List<Rev> reservation = revService.getupdtData(pageNo, pageSize, userNo);
      
      System.out.println(reservation);

      for(Rev r : reservation) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("userNo", r.getUserNo());
        params.put("roomNo", r.getRmsNo());

        int no = revService.count(params);

        System.out.println(no);

        if(no == 1) {
          r.setCount(true);
        }
      }

      content.put("list", reservation);
      content.put("pageNo", pageNo);
      content.put("pageSize", pageSize);
      content.put("totalPage", totalPage);
    } catch (Exception e) {
      content.put("fail", "예약 목록이 없습니다.");
    }
  
    return content;
  }
  
  @PostMapping("cancel")
  public Object cancel(int no) {
    HashMap<String,Object> content = new HashMap<>();
    
    System.out.println(no);
    
    try {
      revService.cancel(no);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } 

}
