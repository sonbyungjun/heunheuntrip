package com.heun.trip.conf;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration.Dynamic;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

// 웹 애플리케이션에 DispatcherServlet(프론트 컨트롤러)을 배치하고
// DispatcherServlet의 IoC 컨테이너를 설정한다.
// AbstractAnnotationConfigDispatcherServletInitializer 클래스를 상속 받으면 
// DispatcherServlet은 AnnotationConfigWebApplicationContext를 
// IoC 컨테이너로 사용한다.
public class WebAppInitializer 
  extends AbstractAnnotationConfigDispatcherServletInitializer {

  @Override
  protected Class<?>[] getRootConfigClasses() {
    return new Class[] {AppConfig.class /*DatabaseConfig.class, MybatisConfig.class*/};
  }
  
  @Override
  protected Class<?>[] getServletConfigClasses() {
    return new Class[] {DefaultWebConfig.class};
  }
  
  @Override
  protected String[] getServletMappings() {
    return new String[] {"/app/*"};
  }
  
  @Override
  protected String getServletName() {
    return "app";
  }
  
  @Override
  protected Filter[] getServletFilters() {
    return new Filter[] {new CharacterEncodingFilter("UTF-8")};
  }
  
  @Override
  protected void customizeRegistration(Dynamic registration) {
    MultipartConfigElement multipartConfig = new MultipartConfigElement("/tmp", 5000000, 20000000, 1000000);
    registration.setMultipartConfig(multipartConfig);
  }
 
}








