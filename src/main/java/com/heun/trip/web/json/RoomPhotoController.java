package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.annotation.MultipartConfig;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.heun.trip.service.RoomService;

@MultipartConfig(maxFileSize = 1024 * 1024 * 5)
@RestController("json/RoomPhotoController")
@RequestMapping("/json/roomPhoto")
public class RoomPhotoController {

  RoomService roomSerive;

  public RoomPhotoController(RoomService roomSerive) {
    this.roomSerive = roomSerive;
  }

  @PostMapping("add")
  public String add(@RequestParam("files[]") MultipartFile[] files) throws Exception {

    for (MultipartFile f : files) {
      if (!f.isEmpty()) {
        System.out.println(f.getName());
      }

    }


    return null;
  }



  @PostMapping("preload")
  public Object preload() throws Exception {
    Map<String, Object> content = new HashMap<>();
    Map<String, Object> data = new HashMap<>();
    Map<String, Object> listProps = new HashMap<>();

    listProps.put("id", "");

    data.put("readerForce", "");
    data.put("url", "");
    data.put("date", "");
    data.put("isMain", "");
    data.put("listProps", listProps);


    content.put("name", "");
    content.put("type", "");
    content.put("size", "");
    content.put("file", "");
    content.put("data", data);


    return content;
  }
 
  
}
