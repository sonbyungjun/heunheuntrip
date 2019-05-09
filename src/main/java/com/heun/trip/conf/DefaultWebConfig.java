package com.heun.trip.conf;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.UrlPathHelper;

// DispatcherServlet의 IoC 컨테이너가 준비해야 할 객체에 대한 정보.
// => app-servlet.xml의 설정을 이 클래스가 대체한다.
// 
@ComponentScan("com.heun.trip.web")
@EnableWebMvc
public class DefaultWebConfig implements WebMvcConfigurer {
  
  @Override
  public void configurePathMatch(PathMatchConfigurer configurer) {
    // 매트릭스 변수 등을 사용할 수 있도록 기능을 활성화시키려면
    // 이 메서드를 오버라이딩하여 파라미터로 넘겨 받은 객체를 통해 
    // 설정해 줘야 한다.
    
    // 클라이언트가 보낸 URL을 처리하는 도우미 객체를 준비한다.
    UrlPathHelper urlPathHelper = new UrlPathHelper();
    
    // 다음의 예와 같이 URL 경로에서 세미콜론(;)있는 값을 제거하지 않도록 설정한다.
    //   http://localhost:8080/java-spring-webmvc/c04_1/aaa;name=kim;age=20
    // 
    // 그래야 페이지 컨트롤러의 request handler에서 해당 매트릭스 값을 추출할 수 있다.
    urlPathHelper.setRemoveSemicolonContent(false);
    
    // 위에서 준비한 도우미 객체를 설정기에 등록한다.
    // 이것은 XML에서 다음과 같이 설정한 것과 같다.
    // => <mvc:annotation-driven  enable-matrix-variables="true"/>
    configurer.setUrlPathHelper(urlPathHelper);
  }
  
}









