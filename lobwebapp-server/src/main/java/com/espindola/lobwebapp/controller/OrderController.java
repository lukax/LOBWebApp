package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.facade.OrderFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.validator.OrderValidator;

@Controller
@RequestMapping(value = "/order")
public class OrderController extends AbstractEntityController<Order> {

	@Autowired
	public OrderController(OrderFacade facade, OrderValidator validator) {
		super(facade, validator, MessageKey.ORDER);
	}

}
