package com.heun.trip.web.json;

import java.io.OutputStream;
import java.util.UUID;
import javax.servlet.annotation.MultipartConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@MultipartConfig(maxFileSize = 1024 * 1024 * 5)
@RestController("json/AwsFileController")
@RequestMapping("/json/images")
public class AwsFileController {

  @PostMapping("upload")
  public void upload(MultipartFile[] files) {
    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();

    String filename = UUID.randomUUID().toString();
    for (MultipartFile f : files) {
      try {
        s3.putObject(PutObjectRequest.builder().bucket("b1.sbj.kr")
            .key(filename).build(), RequestBody.fromInputStream(f.getInputStream(), f.getSize()));
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    System.out.println("버킷에 파일 업로드 완료!");
  }

  @GetMapping("down/{name}")
  public void download(@PathVariable String name, OutputStream out) {
    System.out.println(name);
    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();

    try {
      s3.getObject(GetObjectRequest.builder()
          .bucket("b1.sbj.kr").key(name).build(),
          ResponseTransformer.toOutputStream(out));
    } catch (Exception e) {
      
      e.printStackTrace();
    }
    System.out.println("버킷의 파일 다운로드 완료!");
  }
  
  @GetMapping("del/{name}")
  public void delete(@PathVariable String name) {
    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();

    DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
        .bucket("b1.sbj.kr").key(name).build();
    s3.deleteObject(deleteObjectRequest);

    System.out.println("버킷의 파일 삭제!");
  }

}
