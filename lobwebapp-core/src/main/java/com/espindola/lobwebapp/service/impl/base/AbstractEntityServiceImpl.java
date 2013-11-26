package com.espindola.lobwebapp.service.impl.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public abstract class AbstractEntityServiceImpl<T extends AbstractEntity> implements EntityService<T> {

	private EntityRepository<T> repository;

	@Autowired
	public AbstractEntityServiceImpl(EntityRepository<T> repository) {
		this.repository = repository;

	}

	@Override
	public T find(Long id) throws EntityNotFoundException {
		throw_if_entity_not_exists(id);
		return repository.findOne(id);
	}

	@Override
	// @Transactional Spring JPA is already annotated with this
	public T save(T entity) throws EntityExistsException, EntityInvalidException {
		throw_if_entity_is_null(entity);
		throw_if_entity_exists(entity.getId());
		if(entity.getId() != 0)
			throw new EntityInvalidException("Default Id for saving is 0", entity);
		return repository.save(entity);
	}

	@Override
	public T update(T entity) throws EntityNotFoundException, EntityInvalidException {
		throw_if_entity_is_null(entity);
		throw_if_entity_not_exists(entity.getId());
		return repository.save(entity);
	}

	@Override
	public T remove(Long id) throws EntityNotFoundException {
		throw_if_entity_not_exists(id);
		T retrievedEntity = find(id);
		repository.delete(find(id));
		return retrievedEntity;
	}

	@Override
	public Boolean contains(T entity) throws EntityNotFoundException, EntityInvalidException {
		T retrievedEntity = find(entity.getId());
		if(retrievedEntity.equals(entity))
			return true;
		return false;
	}

	@Override
	public List<T> list() {
		return repository.findAll();
	}

	protected void throw_if_entity_is_null(T entity) throws EntityInvalidException {
		String message;
		if (entity == null) message = "Entity object is null";
		else if(entity.getId() == null) message = "Id field is null";
		else return;
		throw new EntityInvalidException(message);
	}
	protected void throw_if_entity_exists(Long id) throws EntityExistsException {
		if (repository.exists(id))
			throw new EntityExistsException("Entity exists in repository");
	}
	protected void throw_if_entity_not_exists(Long id) throws EntityNotFoundException {
		if(!repository.exists(id))
			throw new EntityNotFoundException("Entity not found in repository");
	}
	
}
