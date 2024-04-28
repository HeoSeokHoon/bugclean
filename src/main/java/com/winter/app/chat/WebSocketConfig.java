/*
 * package com.winter.app.chat;
 * 
 * import org.springframework.context.annotation.Configuration; import
 * org.springframework.messaging.simp.config.MessageBrokerRegistry; import
 * org.springframework.web.socket.WebSocketHandler; import
 * org.springframework.web.socket.config.annotation.EnableWebSocket; import
 * org.springframework.web.socket.config.annotation.StompEndpointRegistry;
 * import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
 * import
 * org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
 * import org.springframework.web.socket.config.annotation.
 * WebSocketMessageBrokerConfigurer;
 * 
 * import lombok.RequiredArgsConstructor;
 * 
 * @RequiredArgsConstructor
 * 
 * @Configuration
 * 
 * @EnableWebSocket public class WebSocketConfig implements
 * WebSocketMessageBrokerConfigurer {
 * 
 * 
 * @Override public void registerStompEndpoints(StompEndpointRegistry registry)
 * { registry.addEndpoint("/example").withSockJS(); }
 * 
 * @Override public void configureMessageBroker(MessageBrokerRegistry registry)
 * { registry.setApplicationDestinationPrefixes("/test");
 * registry.enableSimpleBroker("/topic","/queue"); }
 * 
 * }
 */