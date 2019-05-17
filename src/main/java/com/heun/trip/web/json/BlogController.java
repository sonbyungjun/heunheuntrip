package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Blog;
import com.heun.trip.domain.Member;
import com.heun.trip.domain.Roomcheckout;
import com.heun.trip.service.BlogService;


@RestController("json/BlogController")
@RequestMapping("/json/blog")
public class BlogController {

  BlogService blogService;

  public BlogController(BlogService blogService) {
    this.blogService = blogService;
  }


  @PostMapping("add")
  public Object add(Blog blog) {
    HashMap<String,Object> content = new HashMap<>();

    try {
      blogService.add(blog);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("roomCheckOut")
  public Object roomCheckOut(HttpSession session) {
    Map<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    if (loginUser != null) {
      int userNo = loginUser.getNo();
      String userName = loginUser.getName();
      content.put("userNo", userNo);
      content.put("userName", userName);
      List<Roomcheckout> roomCheckOut = blogService.roomCheckOut(userNo);
      System.out.println(userNo);
      content.put("list", roomCheckOut);
    }
    return content;
  }


  @GetMapping("list")
  public Object list() { // localhost:8080/heunheuntrip/app/json/blog/list


    List<Blog> blogs = blogService.list();

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", blogs);

    return content;
  }

  @GetMapping("detail")
  public Object detail(int no) { // localhost:8080/heunheuntrip/app/json/blog/detail?no=1
    Blog blog = blogService.get(no);
    return blog;
  }

  @GetMapping("checkUser")
  public Object checkUser(HttpSession session) { // localhost:8080/heunheuntrip/app/json/blog/checkUser
    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    System.out.println(loginUser);
    try {
      if (loginUser != null) {
        int userNo = loginUser.getNo();
        String userName = loginUser.getName();
        content.put("userNo", userNo);
        content.put("userName", userName);
        if(blogService.checkRev(userNo) == 1) {
          content.put("status", "success");
        } else {
          content.put("status", "fail");
        }
      }
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @PostMapping("update")
  public Object update(Blog blog) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (blogService.update(blog) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }


  @GetMapping("delete")
  public Object delete(int no) {

    HashMap<String,Object> content = new HashMap<>();

    try {
      if (blogService.delete(no) == 0) { 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      }
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
}
