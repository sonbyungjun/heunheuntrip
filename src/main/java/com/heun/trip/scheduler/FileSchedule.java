package com.heun.trip.scheduler;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.heun.trip.dao.FileDao;
import com.heun.trip.service.FileService;

@Component
public class FileSchedule {
  
  @Autowired
  FileService fileService;
  @Autowired
  FileDao fileDao;
  
//  @Scheduled(cron="0 * * * * *")
  public void fileSync() {
    List<String> awsList = fileService.fileList();
    System.out.println(awsList.size());
    for (String name : awsList) {
    }
    List<String> dbList = fileDao.findAll();
    System.out.println(dbList.size());
  }
  
}
