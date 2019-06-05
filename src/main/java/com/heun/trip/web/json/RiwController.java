package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Riw;
import com.heun.trip.service.RiwService;


@RestController("json/RiwController")
@RequestMapping("/json/riw")
public class RiwController {

  RiwService riwService;

  public RiwController(RiwService riwService) {
    this.riwService = riwService;
  }

  @PostMapping("add")
  public Object add(Riw riw) {
    HashMap<String,Object> content = new HashMap<>();
    System.out.println(riw);
    try {
      // riwService.add(riw);
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
      @RequestParam(defaultValue="15") int pageSize
      ) { // localhost:8080/heunheuntrip/app/json/qna/list

    if (pageSize < 1 || pageSize > 16) 
      pageSize = 15;

    int rowCount = riwService.size();
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;

    List<Riw> hostqnas = riwService.list(pageNo, pageSize);

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", hostqnas);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;
  }

  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      riwService.delete(no);
      content.put("status", "success");
    }catch (Exception e){
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("detail")
  public Object detail(int no) {
    Riw riw = riwService.get(no);
    HashMap<String,Object> content = new HashMap<>();
    content.put("riw", riw);
    return content;
  }

@PostMapping("update")
   public Object update(Riw riw) {
     HashMap<String,Object> content = new HashMap<>();
     try {
       if (riwService.update(riw) == 0) 
         throw new RuntimeException("해당 번호의 게시물이 없습니다.");
       content.put("status", "success");
       
     } catch (Exception e) {
       content.put("status", "fail");
       content.put("message", e.getMessage());
     }
     return content;
   }
  
  
  
  
  
  
  //  @GetMapping("detail")
  //  public Object detail(int no) {
  //   Qna qna = qnaService.get(no);
  //    return qna;
  //  }
  //  
  //  @GetMapping("relist")
  //  public Object reList(int parent, int step) {
  //    List<Qna> qna = qnaService.reList(parent, step);
  //    HashMap<String,Object> content = new HashMap<>();
  //    content.put("list", qna);
  //    return content;
  //  }
  //  
  //  @GetMapping("categorylist")
  //  public Object categoryList() {
  //    List<Category> categories = qnaService.getCategory();
  //    Map<String,Object> content = new HashMap<>();
  //    content.put("category", categories);
  //    return content;
  //  }
  // 
  //  
  //
  
  // 
  // 
  // @GetMapping("delete")
  // public Object delete(int no, int parent, int order) {
  // 
  //   HashMap<String,Object> content = new HashMap<>();
  //   
  //   try {
  //     if (qnaService.delete(no, parent, order)  == 0) 
  //       throw new RuntimeException("해당 번호의 게시물이 없습니다.");
  //     content.put("status", "success");
  //     
  //   } catch (Exception e) {
  //     content.put("status", "fail");
  //     content.put("message", e.getMessage());
  //   }
  //   return content;
  // }




}
