package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Hostqna;
import com.heun.trip.service.HostqnaService;


@RestController("json/QnaController")
@RequestMapping("/json/hostqna")
public class HostqnaController {
  
 HostqnaService hostQnaService;
  
  public HostqnaController(HostqnaService hostQnaService) {
    this.hostQnaService = hostQnaService;
  }
  
  @PostMapping("add")
  public Object add(Hostqna hostqna) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      hostQnaService.add(hostqna);
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
      @RequestParam(defaultValue="10") int pageSize
      ) { // localhost:8080/heunheuntrip/app/json/qna/list
//    
//    if (pageSize < 7 || pageSize > 8) 
//      pageSize = 7;
//    
//    int rowCount = qnaService.size();
//    int totalPage = rowCount / pageSize;
//    if (rowCount % pageSize > 0)
//      totalPage++;
//    
//    if (pageNo < 1) 
//      pageNo = 1;
//    else if (pageNo > totalPage)
//      pageNo = totalPage;
    
    List<Hostqna> hostqnas = hostQnaService.list(pageNo, pageSize);
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", hostqnas);
//    content.put("pageNo", pageNo);
//    content.put("pageSize", pageSize);
//    content.put("totalPage", totalPage);
//    
    return content;
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
    Hostqna hostqna = hostQnaService.get(no);
    return hostqna;
  }
  
  @GetMapping("delete")
  public Object delete(int no) {
  
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (hostQnaService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  @PostMapping("update")
  public Object update(Hostqna hostqna) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (hostQnaService.update(hostqna) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  
  
}
