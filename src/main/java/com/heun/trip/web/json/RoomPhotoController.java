package com.heun.trip.web.json;

import java.util.Map;
import java.util.Set;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.Part;
import org.springframework.web.bind.annotation.PostMapping;
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
  public String add(Map<String,Object> parameter, Part[] photo) throws Exception {
      Set<String> key = parameter.keySet();
      
      for (String k : key) {
        System.out.println(k);
      }
//    String uploadDir = servletContext.getRealPath(
 //       "/upload/photoboard");

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
  
}
