package com.heun.trip.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.BlogDao;
import com.heun.trip.domain.Blog;
import com.heun.trip.domain.Roomcheckout;
import com.heun.trip.service.BlogService;

@Service
public class BlogServiceImpl implements BlogService {

  BlogDao blogDao;
  

  public BlogServiceImpl(BlogDao blogDao) {
    this.blogDao = blogDao;
  }

  @Override
  public List<Blog> list() {
    return blogDao.findAll();
  }
       
  @Override
  public Blog get(int no) {
    return blogDao.findByNo(no);
  }
  
  @Override
  public int checkRev(int no) {
    return blogDao.checkRev(no);
  }

  @Override
  public int add(Blog blog) {
    System.out.println("서비스====> " + blog);
    return blogDao.insert(blog);
  }

  @Override
  public List<Roomcheckout> roomCheckOut(int no) {
    return blogDao.roomCheckOut(no);
  }
  
  @Override
  public int delete(int no) {
    return blogDao.delete(no);
  }
  
  @Override
  public int update(Blog blog) {
    return blogDao.update(blog);
  }
}







