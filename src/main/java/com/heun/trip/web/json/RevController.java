package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Member;
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
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize, 
      HttpSession session
      ) { 
    Member member = (Member)session.getAttribute("loginUser");
    HashMap<String,Object> content = new HashMap<>();

    if (pageSize < 1 || pageSize > 6) 
      pageSize = 5;

    int rowCount = revService.size(member.getNo());
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;


    try {
      List<Rev> reservation = revService.list(pageNo, pageSize);

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
      content.put("pageNo", pageNo);
      content.put("pageSize", pageSize);
      content.put("totalPage", totalPage);
    } catch (Exception e) {
      content.put("fail", "예약 목록이 없습니다.");
    }

    return content;
  }

}
