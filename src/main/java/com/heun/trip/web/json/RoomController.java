package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.annotation.MultipartConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.heun.trip.domain.Room;
import com.heun.trip.service.RoomService;

@MultipartConfig(maxFileSize = 1024 * 1024 * 5)
@RestController("json/RoomController")
@RequestMapping("/json/room")
public class RoomController {
  
  RoomService roomSerive;
  
  public RoomController(RoomService roomSerive) {
    this.roomSerive = roomSerive;
  }
  
  @GetMapping("add")
  public Object add(@RequestBody String content) {
    System.out.println(content);
    return null;
  } 
  
  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize
      ) { // localhost:8080/heunheuntrip/app/json/qna/list
    
    if (pageSize < 1 || pageSize > 6) 
      pageSize = 5;
    
    int rowCount = roomSerive.size();
    
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;
    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    
    List<Room> rooms = roomSerive.list(pageNo, pageSize);
    
    HashMap<String,Object> content = new HashMap<>();
    content.put("list", rooms);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
   Room room = roomSerive.get(no);
    return room;
  }
  
}
