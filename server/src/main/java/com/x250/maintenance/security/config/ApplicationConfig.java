package com.x250.maintenance.security.config;

import com.x250.maintenance.security.user.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

  private final AppUserRepository repository;

//  @Bean
//  public UserDetailsService myUserDetailsService() {
//    return new UserDetailsService() {
//      @Override
//      public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return repository.findByEmail(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//      }
//    };
//  }
// below code is equivalent to this one
  @Bean
  public UserDetailsService userDetailsService() {
    return username -> repository.findByEmail(username) // anonymous inner class
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }//This is a lambda expression that serves as the implementation of the loadUserByUsername method in the UserDetailsService interface

  @Bean // data access object which is responsible to fetch the user details and also encode password and so forth
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(); // one of implementations
    authProvider.setUserDetailsService(userDetailsService());// we need to tell authentication provider which
    // userDetailService to use in order to fetch information about our user we might have several
    authProvider.setPasswordEncoder(passwordEncoder()); // we need to specify which password encoder we are using in our application
    return authProvider;
  }

  @Bean // responsible to manage the authentication. There is a method which allows us to authenticate a user based on using username and password
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager(); // we use default implementation of Spring Boot
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
