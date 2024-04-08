package com.winter.app.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/employee/*")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping("login")
	public void login(@ModelAttribute EmployeeVO employeeVO) throws Exception{
		
	}
	
	@GetMapping("create")
	public void create() throws Exception{
		
	}
	
	@GetMapping("mypage")
	public void mypage() throws Exception{
		
	}
	
	@GetMapping("idSearch")
	public void idFind() throws Exception{
		
	}
	@GetMapping("pwSearch")
	public void pwFind() throws Exception{
		
	}
	
	@GetMapping("inbox")
	public void getInbox() throws Exception{
		
	}
	
	@GetMapping("sample1")
	public void sample() throws Exception{
		
	}
	@GetMapping("sample2")
	public void sample2() throws Exception{
		
	}
}