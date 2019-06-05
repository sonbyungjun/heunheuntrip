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

    List<Rev> reservation = revService.list();

    HashMap<String,Object> content = new HashMap<>();
    content.put("list", reservation);

    return content;
  }
}
