package com.heun.trip.web.json;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.heun.trip.domain.Member;
import com.heun.trip.service.MemberService;
import com.heun.trip.web.Gmail;
import com.heun.trip.web.RanNo;

@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {

  
 
  MemberService memberService;
  ServletContext servletContext;

  public MemberController(MemberService memberService, ServletContext servletContext) {
    this.memberService = memberService;
    this.servletContext= servletContext;
  }

  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="15") int pageSize,
      String search) { 

    if (pageSize < 5 || pageSize > 8) 
      pageSize = 15;

    int rowCount = memberService.size(search);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;

    List<Member> members = memberService.list(pageNo, pageSize, search);

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", members);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;
  }

  @GetMapping("detail")
  public Object detail(int no) {
    Member member = memberService.get(no);
    return member;
  }

  @PostMapping("add")
  public Object add(Member member, MultipartFile photo) {
    HashMap<String,Object> content = new HashMap<>();
    
    if (photo != null) {
      String filename = UUID.randomUUID().toString();
      String uploadDir = servletContext.getRealPath(
          "/html/memberupload");
      try {
        photo.transferTo(new File(uploadDir + "/" + filename));
      } catch (IllegalStateException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      }
      member.setPhoto(filename);
    } else {
      String deft = servletContext.getRealPath("/images/default.jpg");
      member.setPhoto(deft);
    }
    
    try {
      memberService.add(member);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  // localhost:8080/.../../update
  @PostMapping("update")
  public Object update(Member member) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      memberService.update(member);
      content.put("status", "success");
    }catch (Exception e){
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
     memberService.delete(no);
     content.put("status", "success");
    }catch (Exception e){
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @GetMapping("email")
  public Object email(String email) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      int ranNo = RanNo.randomNo();
      Gmail.gmailSend(email, ranNo);
      
      content.put("status", "success");
      content.put("ranNo", ranNo);

    }catch (Exception e){
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
}
