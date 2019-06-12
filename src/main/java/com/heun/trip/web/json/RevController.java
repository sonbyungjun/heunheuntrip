package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Member;
import com.heun.trip.domain.Rev;
import com.heun.trip.service.RevService;


@RestController("json/RevController")
@RequestMapping("/json/rev")
public class RevController {

  RevService revService;

  public RevController(RevService revService) {
    this.revService = revService;
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
