package com.heun.trip.web.json;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.heun.trip.conf.Gmail;
import com.heun.trip.conf.Sms;
import com.heun.trip.domain.Member;
import com.heun.trip.service.MemberService;
import com.heun.trip.web.EnRanNo;
import com.heun.trip.web.RanNo;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {

  MemberService memberService;
  ServletContext servletContext;
  Sms sms;
  Gmail gmail;

  public MemberController(MemberService memberService, ServletContext servletContext, Sms sms, Gmail gmail) {
    this.memberService = memberService;
    this.servletContext= servletContext;
    this.sms = sms;
    this.gmail = gmail;
  }

  @GetMapping("profile")
  public Object profile(HttpSession session) {   
    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser != null) {
      Member member = memberService.get(loginUser.getNo());
      content.put("status", "success");
      content.put("member", member);
    } else {
      content.put("fail", "유저 정보가 없습니다.");
    }

    return content;
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



  @PostMapping("snsadd")
  public Object snsadd(Member member, MultipartFile photo) {
    System.out.println(photo);
    HashMap<String,Object> content = new HashMap<>();
    StringBuffer ranNo = EnRanNo.randomNo();
    String EnranNo = ranNo.toString();

    if (photo != null) {
      String filename = UUID.randomUUID().toString();
      String uploadDir = servletContext.getRealPath(
          "/html/memberupload");
      File orginFile= new File(uploadDir + "/" + filename); 
      File thumFile=new File(uploadDir+"/" + filename);
      try {
        photo.transferTo(orginFile);
        Thumbnails.of(orginFile).crop(Positions.CENTER).size(30,30).outputFormat("jpeg").toFile(thumFile);
      } catch (IllegalStateException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      }
      member.setPhoto(filename+".jpeg");
    } else {
      String deft ="default.jpeg";
      member.setPhoto(deft);
    }
    try {
      if(memberService.get(member.getEmail()) ==null) {
        member.setPassword(EnranNo);
        memberService.snsadd(member);
        content.put("status", "success");

      } else if(memberService.get(member.getEmail()).getEmail().equals(member.getEmail())){
        System.out.println("진입");
        content.put("status", "overlap");
        content.put("message", "이미 일반회원으로 가입했습니다");
        return content;
      }else {
        content.put("status", "fail");
        content.put("message", "오류");
      }

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @PostMapping("add")
  public Object add(Member member,
      int ranNo,
      HttpSession session,
      MultipartFile photo) {
    HashMap<String,Object> content = new HashMap<>();
    int checkNo = (int)session.getAttribute("ranNo");
    Member count = memberService.get(member.getEmail());
    try { 

      if (checkNo == ranNo && count==null){

        if (photo != null) {
          // 헤더용 썸네일 제작
          String filename = UUID.randomUUID().toString();
          String uploadDir = servletContext.getRealPath(
              "/html/memberupload");
          File orginFile= new File(uploadDir + "/" + filename); 
          File thumFile=new File(uploadDir+"/" + filename);

          // 프로필용 썸네일제작
          String profileuploadDir = servletContext.getRealPath(
              "/html/memberprofileupload");
          File profilethumFile=new File(profileuploadDir+"/" + filename);

          try {
            photo.transferTo(orginFile);
            Thumbnails.of(orginFile).crop(Positions.CENTER).size(30,30).outputFormat("jpeg").toFile(thumFile);
            Thumbnails.of(orginFile).crop(Positions.CENTER).size(250,250).outputFormat("jpeg").toFile(profilethumFile);
          } catch (IllegalStateException e) {
            e.printStackTrace();
          } catch (IOException e) {
            e.printStackTrace();
          }
          member.setPhoto(filename+".jpeg");
        } else {
          String deft ="default.jpeg";
          member.setPhoto(deft);
        }
        memberService.add(member);
        content.put("status", "success");
      } else {
        content.put("status", "fail");
      }

    } catch (Exception e) {
      content.put("message", e.getMessage());
    }
    return content;
  }
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



  @PostMapping("updateprofile")
  public Object profileupdate(Member member,  MultipartFile photo) {
    HashMap<String,Object> content = new HashMap<>();

    if (photo != null) {
      String filename = UUID.randomUUID().toString();
      String uploadDir = servletContext.getRealPath(
          "/html/memberupload");
      File orginFile= new File(uploadDir + "/" + filename); 
      File thumFile=new File(uploadDir+"/" + filename);
      // 프로필용 썸네일제작
      String profileuploadDir = servletContext.getRealPath(
          "/html/memberprofileupload");
      File profilethumFile=new File(profileuploadDir+"/" + filename);
      try {
        photo.transferTo(orginFile);
        Thumbnails.of(orginFile).crop(Positions.CENTER).size(30,30).outputFormat("jpeg").toFile(thumFile);
        Thumbnails.of(orginFile).crop(Positions.CENTER).size(250,250).outputFormat("jpeg").toFile(profilethumFile);
      } catch (IllegalStateException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      }
      member.setPhoto(filename+".jpeg");
    } else {
      String deft ="default.jpeg";
      member.setPhoto(deft);
    }

    try {
      memberService.update(member);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }


  @PostMapping("updatepwd")
  public Object updatepwd(Member member, HttpSession session) {
    HashMap<String,Object> content = new HashMap<>();


    Member loginUser = (Member) session.getAttribute("loginUser");

    member.setNo(loginUser.getNo());

    try {
      if (memberService.pwdupdate(member) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }


  @PostMapping("Emailupdate")
  public Object Emailupdate(Member member) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      memberService.Emailupdate(member);
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
  public Object email(String email,
      HttpSession session) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      int ranNo = RanNo.randomNo();
      String title = "이메일 인증";
      String text = "인증번호는 [" + ranNo + "] 입니다.";

      gmail.gmailSend(email, title, text);

      content.put("status", "success");
      session.setAttribute("ranNo", ranNo);
    }catch (Exception e){
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("resetemail")
  public Object resetemail(String email) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      StringBuffer EnranNo = EnRanNo.randomNo();
      String title = "임시 비밀번호 발급";
      String text = "임시 비밀번호는 [" + EnranNo + "] 입니다.";

      gmail.gmailSend(email, title, text);

      content.put("status", "success");
      content.put("EnranNo", EnranNo);

    }catch (Exception e){
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("sms")
  public Object sms(String tel, HttpSession session) {

    int ranNo = RanNo.randomNo();
    String messageText = "인증번호 [" + String.valueOf(ranNo) + "] 입니다.\n";

    HashMap<String,Object> content = new HashMap<>();
    try {
      sms.smsSend(tel, messageText);
    } catch (Exception e) {
      e.printStackTrace();
    }
    System.out.println(tel);
    session.setAttribute("sms", ranNo);
    content.put("status", "success");
    content.put("ok", true);
    System.out.println("???");
    content.put("ok", false);

    return content;
  }

  @GetMapping("checkEmail")
  public Object checkEmail(int ranNo,
      HttpSession session) {
    HashMap<String,Object> content = new HashMap<>();
    int checkNo = (int)session.getAttribute("ranNo");

    try {
      if(checkNo == ranNo) {
        content.put("status", "success");
      } else {
        content.put("status", "fail");
      }

    }catch (Exception e){
      content.put("message", e.getMessage());
    }
    return content;
  }



}
