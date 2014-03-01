package com.espindola.lobwebapp.config.context;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.jolbox.bonecp.BoneCPDataSource;

@Profile("dev")
@EnableTransactionManagement
@EnableJpaRepositories("com.espindola.lobwebapp.repository")
@Configuration
public class PersistenceDevContextConfig {

	@Bean
	public BoneCPDataSource dataSource(){
		BoneCPDataSource dataSource = new BoneCPDataSource();
		dataSource.setDriverClass("org.hsqldb.jdbcDriver");
		dataSource.setJdbcUrl("jdbc:hsqldb:mem:lobwebapp");
		dataSource.setUsername("sa");
		dataSource.setPassword("");
		return dataSource;
	}
	
	@Bean
	public JpaTransactionManager transactionManager(){
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setDataSource(dataSource());
		transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
		return transactionManager;
	}
	
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(){
		LocalContainerEntityManagerFactoryBean bean = new LocalContainerEntityManagerFactoryBean();
		bean.setDataSource(dataSource());
		bean.setJpaVendorAdapter(hibernateJpaVendorAdapter());
		bean.setPackagesToScan("com.espindola.lobwebapp.domain");
			Properties jpaProperties = new Properties();
			jpaProperties.setProperty("hibernate.dialect", "org.hibernate.dialect.HSQLDialect");
			jpaProperties.setProperty("hibernate.ejb.naming_strategy", "org.hibernate.cfg.ImprovedNamingStrategy");
			jpaProperties.setProperty("hibernate.hbm2ddl.auto", "create-drop");
			jpaProperties.setProperty("hibernate.format_sql", "true");
			jpaProperties.setProperty("hibernate.show_sql", "true");
		bean.setJpaProperties(jpaProperties);
		return bean;
	}
	
	@Bean
	public HibernateJpaVendorAdapter hibernateJpaVendorAdapter(){
		return new HibernateJpaVendorAdapter();
	}
}