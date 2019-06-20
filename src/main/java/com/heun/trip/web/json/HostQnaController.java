
package com.heun.trip.web.json;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.HostQna;
import com.heun.trip.domain.Member;
import com.heun.trip.domain.Rev;
import com.heun.trip.domain.Room;
import com.heun.trip.service.HostQnaService;
import com.heun.trip.service.MemberService;
import com.heun.trip.service.RevService;
import com.heun.trip.service.RoomService;


@RestController("json/HostQnaController")
@RequestMapping("/json/hostqna")
public class HostQnaController {

  HostQnaService hostQnaService;
  RevService revService;
  RoomService roomService;
  MemberService memberService;

  public HostQnaController(HostQnaService hostQnaService, RevService revService, RoomService roomService, MemberService memberService) {
    this.hostQnaService = hostQnaService;
    this.revService = revService;
    this.roomService = roomService;
    this.memberService = memberService;
  }

  @PostMapping("add")
  public Object add(HostQna hostQna, HttpSession session) {

    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    
    System.out.println(hostQna);

    try {
      
      int userNo = loginUser.getNo();
      hostQna.setUserNo(userNo);
      hostQnaService.add(hostQna);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("hostqnalist")
  public Object hostQnaList(int no, HttpSession session) { // localhost:8080/heunheuntrip/app/json/qna/list

    List<HostQna> hostQnaList = hostQnaService.HostList(no);
    Member loginUser = (Member) session.getAttribute("loginUser");
    HashMap<String, Object> content = new HashMap<>();
    
    if (loginUser != null) {
      content.put("loginUserNo", loginUser.getNo());
      String auth = loginUser.getAuth();
      
      if (auth.equals("일반회원")) {
        
        Rev rev = revService.detail(no);
        int rmsNo = rev.getRmsNo();
        Room room = roomService.get(rmsNo);
        int hostNo = room.getHostNo();
        Member member = memberService.get(hostNo);
        String hostPhoto = member.getPhoto();
        
        content.put("hostPhoto", hostPhoto);
        
      } else if (auth.equals("호스트")) {
        
        Rev rev = revService.detail(no);
        int userNo = rev.getUserNo();
        Member member = memberService.get(userNo);
        String userPhoto = member.getPhoto();
        
        content.put("userPhoto", userPhoto);
      }
    }
    
    content.put("list", hostQnaList);
    
    return content;
  }
  
  @GetMapping("indexlist")
  public Object indexList(HttpSession session) { 

    Member loginUser = (Member) session.getAttribute("loginUser");
    HashMap<String, Object> content = new HashMap<>();
    
    if (loginUser != null) {
      content.put("loginUserNo", loginUser.getNo());
      String auth = loginUser.getAuth();
      
      if (auth.equals("일반회원")) {
        
        List<HostQna> indexList = hostQnaService.NewGuestList(loginUser.getNo());
        
        content.put("list", indexList);
        
      } else if (auth.equals("호스트")) {
        
        List<HostQna> indexList = hostQnaService.NewHostList(loginUser.getNo());
        
        content.put("list", indexList);
      }
    }
    return content;
  }

  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      hostQnaService.delete(no);
      content.put("status", "success");
    }catch (Exception e){
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

}
