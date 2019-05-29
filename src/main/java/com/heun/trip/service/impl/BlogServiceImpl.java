package com.heun.trip.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.heun.trip.dao.BlogDao;
import com.heun.trip.dao.BlogFileDao;
import com.heun.trip.domain.Blike;
import com.heun.trip.domain.Blog;
import com.heun.trip.domain.BlogFile;
import com.heun.trip.domain.Roomcheckout;
import com.heun.trip.service.BlogService;

@Service
public class BlogServiceImpl implements BlogService {

  BlogDao blogDao;
  BlogFileDao blogFileDao;
  

  public BlogServiceImpl(BlogDao blogDao, BlogFileDao blogFileDao) {
    this.blogDao = blogDao;
    this.blogFileDao = blogFileDao;
  }

  @Override
  public List<Blog> list(int pageNo, int pageSize) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    
    return blogDao.findAll(params);
  }
  
  @Override
  public int size() {
    return blogDao.countAll();
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
    blogDao.insert(blog);
    List<BlogFile> files = blog.getPhotoFiles();
    for (BlogFile f : files) {
      f.setBlogNo(blog.getNo());
    }
    blogFileDao.insert(files);
    System.out.println("서비스====> " + blog);
    return 1;
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

  @Override
  public List<Blog> order() {
    
    return blogDao.orderbylist();
  }
  @Override
  public List<Blog> gradeorder() {
    
    return blogDao.orderbygradelist();
  }

  @Override
  public int increaseLike(Blike blike) {
    
    return blogDao.increaseLike(blike);
  }

  @Override
  public int decreaseLike(Blike blike) {
    return blogDao.decreaseLike(blike);
  }

  @Override
  public int checkLike(Blike blike) {
    return blogDao.checkLike(blike);
  }
 
  @Override
  public int checkView(Blike blike) {
    return blogDao.checkView(blike);
  }
  
  @Override
  public int createLike(Blike blike) {
    return blogDao.createLike(blike);
  }
  
  @Override
  public int countLike(int no) {
    return blogDao.countLike(no);
  }
  @Override
  public List<Blog> deorder() {
    
    return blogDao.deorderbylist();

  }

  @Override
  public List<Blog> likebylist() {
    return blogDao.likebylist();
  }

}







