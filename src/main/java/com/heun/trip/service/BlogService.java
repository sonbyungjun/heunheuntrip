package com.heun.trip.service;

import java.util.List;
import com.heun.trip.domain.Blog;
import com.heun.trip.domain.Roomcheckout;

public interface BlogService {
  List<Blog> list();
  Blog get(int no);
  int checkRev(int no);
  int add(Blog blog);
  List<Roomcheckout> roomCheckOut(int no);
  int delete(int no);
  int update(Blog blog);
}
