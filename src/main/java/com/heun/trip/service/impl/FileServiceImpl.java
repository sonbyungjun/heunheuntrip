package com.heun.trip.service.impl;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.imageio.ImageIO;
import org.springframework.stereotype.Service;
import com.heun.trip.service.FileService;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class FileServiceImpl implements FileService {

  @Override
  public int uploadImage(InputStream in, long size, String filename) {
    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();

    try {
      s3.putObject(PutObjectRequest.builder().bucket("b1.sbj.kr")
          .key(filename).build(), RequestBody.fromInputStream(in, size));
    } catch (Exception e) {
      e.printStackTrace();
    }
    
    System.out.println("버킷에 파일 업로드 완료!");
    return 1;
  }
  
  @Override
  public int uploadImage(BufferedImage image, String filename) {
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    try {
      ImageIO.write(image, "jpeg", os);
    } catch (IOException e) {
      e.printStackTrace();
    }
    byte[] buffer = os.toByteArray();
    InputStream is = new ByteArrayInputStream(buffer);
    
    uploadImage(is, buffer.length, filename);
    
    return 1;
  }
  
  @Override
  public int downloadImage(String filename, OutputStream out) {
    System.out.println(filename);
    Region region = Region.AP_NORTHEAST_2;
    S3Client s3 = S3Client.builder().region(region).build();

    try {
      s3.getObject(GetObjectRequest.builder()
          .bucket("b1.sbj.kr").key(filename).build(),
          ResponseTransformer.toOutputStream(out));
    } catch (Exception e) {
      System.out.println("파일이 없습니다.");
//      e.printStackTrace();
    }
    System.out.println("버킷의 파일 다운로드 완료!");
    return 1;
  }

}
