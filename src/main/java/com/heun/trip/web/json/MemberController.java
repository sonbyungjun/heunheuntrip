package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Member;
import com.heun.trip.service.MemberService;

@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {
  
  MemberService memberService;
  
  public MemberController(MemberService memberService) {
    this.memberService = memberService;
  }
  
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize,
      String search) { // localhost:8080/heunheuntrip/app/json/memeber/list
    
    if (pageSize < 5 || pageSize > 8) 
      pageSize = 5;
    
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
}
