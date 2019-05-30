package com.heun.trip.web.json;
import java.util.HashMap;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Member;
import com.heun.trip.service.MemberService;

@RestController("json/AuthController")
@RequestMapping("/json/auth")
public class AuthController {

  MemberService memberService;
  ServletContext servletContext;

  public AuthController(MemberService memberService, ServletContext servletContext) {
    this.memberService = memberService;
    this.servletContext = servletContext;
  }

  final static Logger logger = LogManager.getLogger(AuthController.class);

  @PostMapping("login")
  public Object login(
      String email,
      String password,
      String name,
      HttpSession session,
      int sns_no,
      HttpServletResponse response) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
      Member member = memberService.get(email, password);
      if (member == null) {
        content.put("status", "fail");
      } else {
        content.put("message", "이메일 없거나 암호가 맞지 않습니다.");
        session.setAttribute("loginUser", member);
        content.put("status", "success");
      }
   


    return content;
  }

  @GetMapping("logout")
  public Object logout(HttpSession session) throws Exception {

    logger.debug("세션 무효화시킴!");
    logger.debug("loginUser: " + session.getAttribute("loginUser"));
    session.invalidate();

    HashMap<String,Object> content = new HashMap<>();
    content.put("status", "success");

    return content;
  }

  @GetMapping("user")
  public Object user(HttpSession session) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");

    HashMap<String,Object> content = new HashMap<>();

    if (loginUser != null) {
      content.put("status", "success");
      content.put("user", loginUser);
    } else {
      content.put("status", "fail");
    }

    return content;
  }

  @RequestMapping(value="login", method=RequestMethod.GET)
  public String loginGET() {

    return "user/login";
  }

  @RequestMapping(value="loginPostNaver", method=RequestMethod.GET)
  public String loginPOSTNaver(HttpSession session) {

    return "user/loginPostNaver";
  }

  @PostMapping("snslogin")
  public Object snsLogin(
      String email,
      int sns_no,
      HttpSession session,
      HttpServletResponse response) {

    Member member = memberService.snsget(email, sns_no);

    HashMap<String,Object> content = new HashMap<>();
    
    if (member == null) {
      content.put("status", "fail");
      content.put("message", "이메일이 없거나 암호가 맞지 않습니다.");
    } else {
      session.setAttribute("loginUser", member);
      content.put("status", "success");
    }

    return content;
  }
  
}





