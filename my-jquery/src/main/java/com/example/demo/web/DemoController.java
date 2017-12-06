package com.example.demo.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class DemoController {
	
	@RequestMapping
	public String index(ModelMap map) {
		map.put("message", "index page");
		return "index";
	}
	
}
