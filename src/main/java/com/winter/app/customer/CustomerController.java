package com.winter.app.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.winter.app.employee.EmployeeVO;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/customer/*")
@Slf4j
public class CustomerController {

		
	@Autowired
	CustomerService customerService;
	
	@GetMapping("list")
	public String getList(Model model) throws Exception{
		List<EmployeeVO> ar = customerService.getSales();
		List<CustomerVO> companyList = customerService.getCompanyList();
		List<CustomerVO> personList = customerService.getPersonList();
		model.addAttribute("companyList", companyList);
		model.addAttribute("personList", personList);
		model.addAttribute("sales_List", ar);
		return "customer/list";
	}
	
	@GetMapping("create")
	public void createCustomer(Model model) throws Exception{
		List<EmployeeVO> ar = customerService.getSales();
		
		model.addAttribute("list", ar);
		
	}
	@PostMapping("/create")
	public String createCustomer(CustomerVO customerVO) throws Exception{
		System.out.println("customer VO == == == = == "+customerVO);
		
		customerService.createCustomer(customerVO);
		
		return "redirect:/customer/list";
	}
	
	@PostMapping("update")
	@ResponseBody
	public int updateCustomer(@RequestBody CustomerVO customerVO,Model model) throws Exception{
		
			int result = customerService.updateCustomer(customerVO);
			model.addAttribute("result", result);
			
		return result;
	}
	
	@GetMapping("detail")
	public void getDetail(CustomerVO customerVO,Model model) throws Exception{
		
		
		CustomerVO vo = customerService.getDetail(customerVO);
		
		model.addAttribute("vo", vo);
		
	}
	
	@GetMapping("delete")
	public String deleteCustomer(CustomerVO customerVO) throws Exception{
		System.out.println("delete 진입");
			customerService.deleteCustomer(customerVO);
		
		return "redirect:/customer/list";
	}
	
	
}
