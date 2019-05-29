package com.heun.trip.web.json;
 
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.heun.trip.domain.Blike;
import com.heun.trip.domain.Blog;
import com.heun.trip.domain.Member;
import com.heun.trip.domain.Roomcheckout;
import com.heun.trip.service.BlogService;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

@RestController("json/BlogController")
@RequestMapping("/json/blog")
public class BlogController {

  @Autowired BlogService blogService;
  @Autowired ServletContext servletContext;


  @PostMapping("checkBlike")
  public Object checkBlike(Blike blike) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      int no = blogService.checkLike(blike);
      System.out.println(no);
      content.put("blike", no);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @PostMapping("checkView")
  public Object checkView(Blike blike) {
    HashMap<String,Object> content = new HashMap<>();
    System.out.println(blike);

    int no = blogService.checkView(blike);
    System.out.println(no);
    
    if(no == 0) {
      blogService.createLike(blike);
    }

    try {
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @PostMapping("increaseLike")
  public Object increaseLike(Blike blike) {
    HashMap<String,Object> content = new HashMap<>();

    try {
      blogService.increaseLike(blike);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @PostMapping("decreaseLike")
  public Object decreaseLike(Blike blike) {
    HashMap<String,Object> content = new HashMap<>();

    try {
      blogService.decreaseLike(blike);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @PostMapping("add")
  public Object add(Blog blog, MultipartFile[] files, HttpSession session) throws IOException {
    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    
    // 로긴 유저 정보 저장
    blog.setUserNo(loginUser.getNo());
    
    System.out.println(files);
    // 파일을 경로에 저장
    for (MultipartFile part : files) {
      if (part.getSize() == 0) 
        continue;
      String uploadDir = servletContext.getRealPath(
          "/upload/blogphoto");

      String filename = UUID.randomUUID().toString();
      part.transferTo(new File(uploadDir + "/" + filename));

      blog.setMainPhoto(filename);

      Thumbnails.of(new File(uploadDir + "/" + filename)).crop(Positions.CENTER).size(350,450).outputFormat("jpeg").toFile(new File(uploadDir + "/Thumbnail/" + filename));

    }

    System.out.println("컨트롤러====> " + blog);
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
  public Object detail(int no, HttpSession session) {
    Blog blog = blogService.get(no);
    int countNo = blogService.countLike(no);

    HashMap<String,Object> content = new HashMap<>();
    Member loginUser = (Member) session.getAttribute("loginUser");
    
    System.out.println("로긴한사람~ ===> "  +  loginUser);
    if(loginUser != null) {
      content.put("loginNo", loginUser.getNo());
    }
    content.put("blog", blog);
    content.put("count", countNo);

    return content;
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

  @GetMapping("order")
  public Object order() { // localhost:8080/heunheuntrip/app/json/blog/order


    List<Blog> blogs = blogService.order();

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", blogs);

    return content;
  }
  
  @GetMapping("deorder")
  public Object deorder() { // localhost:8080/heunheuntrip/app/json/blog/order
    
    
    List<Blog> blogs = blogService.deorder();
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", blogs);
    
    return content;
  }

  @GetMapping("gradeorder")
  public Object gradeorder() { // localhost:8080/heunheuntrip/app/json/blog/gradeorder


    List<Blog> blogs = blogService.gradeorder();

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", blogs);

    return content;
  }
  
  @GetMapping("likeorder")
  public Object likeorder() { // localhost:8080/heunheuntrip/app/json/blog/likeorder


    List<Blog> blogs = blogService.likebylist();

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", blogs);

    return content;
  }
}
