package com.heun.trip.web.json;

import java.util.HashMap;
import java.util.Map; 
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.Part;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
  public String add(@RequestBody String content, Part[] photo) throws Exception {

    //    String uploadDir = servletContext.getRealPath(
    //       "/upload/photoboard");

    System.out.println(content.split("Content-Type")[0]);

    for (Part p : photo) {

      if (p.getSize() == 0) 
        continue;

      System.out.println(p.getName());


      //String filename = UUID.randomUUID().toString();
      //p.write(uploadDir + "/" + filename);

      //PhotoFile file = new PhotoFile();
      //file.setFilePath(filename);
      //files.add(file);
    }
    //board.setFiles(files);


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
