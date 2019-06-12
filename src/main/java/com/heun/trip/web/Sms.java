package com.heun.trip.web;

import java.io.IOException;
import com.nexmo.client.NexmoClient;
import com.nexmo.client.NexmoClientException;
import com.nexmo.client.sms.SmsSubmissionResponse;
import com.nexmo.client.sms.messages.TextMessage;

public class Sms {
  
  @SuppressWarnings("unused")
  public void smsSend(String phoneNumber, String messageText) {
    NexmoClient client = new NexmoClient.Builder()
        .apiKey("372df805")
        .apiSecret("Lqhqo3dMIPpcJjtW")
        .build();

      TextMessage message = new TextMessage("흔흔여행", phoneNumber, messageText, true);
      
      SmsSubmissionResponse response = null;
      try {
        response = client.getSmsClient().submitMessage(message);
      } catch (IOException e) {
        e.printStackTrace();
      } catch (NexmoClientException e) {
        e.printStackTrace();
      }
  }
  
}
