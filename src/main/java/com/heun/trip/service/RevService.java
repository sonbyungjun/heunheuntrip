package com.heun.trip.service;

import java.util.List;
import java.util.Map;
import com.heun.trip.domain.Rev;

public interface RevService {
  List<Rev> list(int pageNo, int pageSize);
  int count(Map<String, Object> params);
  int size(int no);
}
