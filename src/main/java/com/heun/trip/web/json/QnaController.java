package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Qna;
import com.heun.trip.service.QnaService;

@RestController("json/QnaController")
@RequestMapping("/json/qna")
public class QnaController {
  
 QnaService qnaService;
  
  public QnaController(QnaService qnaService) {
    this.qnaService = qnaService;
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
    
    List<Qna> qnas = qnaService.list(pageNo, pageSize);
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", qnas);
//    content.put("pageNo", pageNo);
//    content.put("pageSize", pageSize);
//    content.put("totalPage", totalPage);
//    
    return content;
  }
  
}
