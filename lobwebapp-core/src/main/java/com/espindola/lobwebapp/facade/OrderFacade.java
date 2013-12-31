package com.espindola.lobwebapp.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.domain.OrderItem;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.invalidArgument.OrderInvalidException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.service.contract.CustomerService;
import com.espindola.lobwebapp.service.contract.OrderService;
import com.espindola.lobwebapp.service.contract.ProductService;

@Transactional
@Component
public class OrderFacade extends AbstractEntityFacade<Order> {

	private CustomerService customerService;
	private ProductService productService;

	public OrderFacade() { super(null); }
	
	@Autowired
	public OrderFacade(OrderService orderService, ProductService productService, CustomerService customerService) {
		super(orderService);
		this.productService = productService;
		this.customerService = customerService;
	}
	
	@Override
	public Order save(Order entity) throws AlreadyExistsException,InvalidArgumentException {
		throwIfCustomerNotExists(entity);
		throwIfInvalidOrderItem(entity);
		return super.save(entity);
	}
	
	@Override
	public Order update(Order entity) throws NotFoundException, InvalidArgumentException {
		throwIfCustomerNotExists(entity);
		throwIfInvalidOrderItem(entity);
		return super.update(entity);
	}

	
	private void throwIfInvalidOrderItem(Order entity) throws InvalidArgumentException {
		for(OrderItem item : entity.getItems()){
			if(!productService.exists(item.getProduct().getId()))
				throw new OrderInvalidException(new EntityError(MessageKey.ORDERITEMSINVALID_VALIDATION));
		}
	}

	private void throwIfCustomerNotExists(Order entity) {
		if(!customerService.exists(entity.getCustomer().getId()))
			throw new OrderInvalidException(new EntityError(MessageKey.ORDERCUSTOMERINVALID_VALIDATION));
	}

}