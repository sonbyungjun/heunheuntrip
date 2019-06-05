package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Rev;
import com.heun.trip.service.RevService;


@RestController("json/RevController")
@RequestMapping("/json/rev")
public class RevController {

  RevService revService;

  public RevController(RevService revService) {
    this.revService = revService;
  }

  @GetMapping("list")
  public Object list() { 
    HashMap<String,Object> content = new HashMap<>();
    
    List<Rev> reservation = revService.list();
    
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

    return content;
  }

}
