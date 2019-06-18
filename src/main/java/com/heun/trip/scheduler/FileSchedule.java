package com.heun.trip.scheduler;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    Set<String> dbList = fileDao.findAll();
    Set<String> awsList = fileService.fileList();
    
    int count = 0;
    for (String s : dbList) {
      for (String a : awsList) {
        if (!a.contains(s)) {
          continue;
        }
        count++;
      }
    }
  }
  
}
