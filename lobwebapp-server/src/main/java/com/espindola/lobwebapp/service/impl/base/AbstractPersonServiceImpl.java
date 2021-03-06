package com.espindola.lobwebapp.service.impl.base;

import org.springframework.beans.factory.annotation.Autowired;

import com.espindola.lobwebapp.domain.base.Person;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.repository.base.EntityRepository;
import com.espindola.lobwebapp.service.contract.base.PersonService;

public abstract class AbstractPersonServiceImpl<T extends Person> extends
		AbstractEntityServiceImpl<T> implements PersonService<T> {

	@Autowired
	public AbstractPersonServiceImpl(EntityRepository<T> repository,
			MessageKey entityMessageKey) {
		super(repository, entityMessageKey);
	}

}
