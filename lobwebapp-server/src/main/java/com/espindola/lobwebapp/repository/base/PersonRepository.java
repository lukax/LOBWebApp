package com.espindola.lobwebapp.repository.base;

import java.util.List;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.domain.base.Person;

public interface PersonRepository<T extends Person> extends EntityRepository<T> {
	public List<Customer> findByName(String firstname);

}
