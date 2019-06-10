package com.heun.trip.web.json;
  
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map; 
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.annotation.MultipartConfig; 
import javax.servlet.http.HttpSession;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.heun.trip.domain.Convenience;
import com.heun.trip.domain.Member;
import com.heun.trip.domain.Room;
import com.heun.trip.domain.RoomFile;
import com.heun.trip.domain.Safety;
import com.heun.trip.service.RoomService;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

@MultipartConfig(maxFileSize = 1024 * 1024 * 5)
@RestController("json/RoomController")
@RequestMapping("/json/room")
public class RoomController {

  RoomService roomSerive;
  ServletContext servletContext;

  public RoomController(RoomService roomSerive, ServletContext servletContext) {
    this.roomSerive = roomSerive;
    this.servletContext = servletContext;
  }

  @PostMapping("add")
  public Object add(
      Room room, BindingResult result,
      @RequestParam("convenience[]") int[] convenience,
      @RequestParam("safety[]") int[] safety,
      @RequestParam("files[]") String[] files,
      HttpSession session) {

    List<Convenience> cons = new ArrayList<>();
    List<Safety> safes = new ArrayList<>();
    List<RoomFile> roomFiles = new ArrayList<>();

    Map<String,Object> content = new HashMap<>();

    try {
      Member loginUser = (Member) session.getAttribute("loginUser");

      if (loginUser != null) {
        room.setHostNo(loginUser.getNo());
      } else {
        // 테스트 코드
        room.setHostNo(6);
      }

      for (int c : convenience) {
        Convenience con = new Convenience();
        con.setNo(c);
        cons.add(con);
      }
      for (int c : safety) {
        Safety safe = new Safety();
        safe.setNo(c);
        safes.add(safe);
      }
      for (String f : files) {
        RoomFile file = new RoomFile();
        file.setName(f);
        roomFiles.add(file);
      }

      room.setConveniences(cons);
      room.setSafeties(safes);
      room.setPhotos(roomFiles);

      System.out.println(room);
      roomSerive.add(room);
      content.put("status", "success");
      
    } catch (Exception e) {
      e.printStackTrace();
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  @PostMapping("fileAdd")
  public Object fileAdd(@RequestParam(value="files[]", required=false) MultipartFile[] files, boolean isMain) {
    Map<String, Object> content = new HashMap<>();

    String uploadDir = servletContext.getRealPath(
        "/upload/roomphoto");

    String filename = UUID.randomUUID().toString();
    File originFile = new File(uploadDir + "/" + filename);
    File thumFile = new File(uploadDir + "/Thumbnail/" + filename);

    for (MultipartFile f : files) {
      if (!f.isEmpty()) {

        // 메인사진이 아니면 그냥 저장한다.
        try {
          f.transferTo(originFile);
        } catch(Exception e) {
          e.printStackTrace();
        }

        // 메인사진이면 섬네일로 만든 후 맵에 담는다.
        if (isMain) {
          try {
            Thumbnails.of(originFile).crop(Positions.CENTER).size(530,375).outputFormat("jpeg").toFile(thumFile);
            content.put("thumbnail", filename);
          } catch(Exception e) {
            e.printStackTrace();
          }
        } else {
          // 메인사진이 아니면 키값을 다르게 하고 담는다.
          content.put("photo", filename);
        }
      }
    }
    return content;
  }

  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue="0") int pageNo,
      @RequestParam(defaultValue="12") int pageSize,
      String lati,
      String longi
      ) { // localhost:8080/heunheuntrip/app/json/qna/list

    if (pageSize < 1 || pageSize > 12) 
      pageSize = 12;

    int rowCount = roomSerive.size(lati, longi);

    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;
    
    if (pageNo < 1) 
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;

    List<Room> rooms = roomSerive.list(pageNo, pageSize, lati, longi);
    
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
    System.out.println(room);
    return room;
  }
  
  @GetMapping("hostroom")
  public Object hostroom(int no) {
    HashMap<String, Object> contents = new HashMap<>();
    List<Room> list = roomSerive.hostroomlist(no);
    
    contents.put("list", list);
    return contents;
  }
  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      roomSerive.delete(no);
     content.put("status", "success");
    }catch (Exception e){
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

}
