package com.heun.trip.dao;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Blike;
import com.heun.trip.domain.Blog;
import com.heun.trip.domain.Roomcheckout;

public interface BlogDao {
  List<Blog> findAll(Map<String,Object> params);
  int countAll(); 
  Blog findByNo(int no);
  int checkRev(int no);
  int insert(Blog blog);
  List<Roomcheckout> roomCheckOut(int no);
  int delete(int no);
  int update(Blog blog);
  List<Blog> orderbylist();
  List<Blog> orderbygradelist();
  List<Blog> deorderbylist();
  int increaseLike(Blike blike);
  int decreaseLike(Blike blike);
  int checkLike(Blike blike);
  int checkView(Blike blike);
  int createLike(Blike blike);
  int countLike(int no);
}





