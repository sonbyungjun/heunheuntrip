package com.heun.trip.conf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import com.nexmo.client.NexmoClient;
import com.nexmo.client.sms.SmsSubmissionResponse;
import com.nexmo.client.sms.messages.TextMessage;

@Configuration
@PropertySource("classpath:/com/heun/trip/conf/sms.properties")
@EnableTransactionManagement
public class Sms {
  
  @Autowired 
  Environment env;

  @SuppressWarnings("unused")
  public void smsSend(String phoneNumber, String messageText) throws Exception {
    NexmoClient client = new NexmoClient.Builder()
        .apiKey(env.getProperty("sms.apikey"))
        .apiSecret(env.getProperty("sms.apisecret"))
        .build();
    
    String seoul = "82";
    String seoulTel = seoul.concat(phoneNumber.substring(1));

    TextMessage message = new TextMessage("흔흔여행", seoulTel, messageText, true);

    SmsSubmissionResponse response = client.getSmsClient().submitMessage(message);
  }

}
