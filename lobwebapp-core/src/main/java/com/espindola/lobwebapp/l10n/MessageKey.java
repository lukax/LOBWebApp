package com.espindola.lobwebapp.l10n;

public enum MessageKey {
	LOBWEBAPP_EXCEPTION("com.espindola.lobwebapp.exception.lobwebappexception"),
	ALREADYEXISTS_EXCEPTION("com.espindola.lobwebapp.exception.alreadyexistsexception"),
	NOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.notfoundexception"),
	INVALIDARGUMENT_EXCEPTION("com.espindola.lobwebapp.exception.invalidargumentexception"),

	PRODUCTALREADYEXITS_EXCEPTION("com.espindola.lobwebapp.exception.productalreadyexistsexception"),
	PRODUCTINVALID_EXCEPTION("com.espindola.lobwebapp.exception.productinvalidexception"),
	PRODUCTNOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.productnotfoundexception"),
	
	CUSTOMERALREADYEXITS_EXCEPTION("com.espindola.lobwebapp.exception.customeralreadyexistsexception"),
	CUSTOMERINVALID_EXCEPTION("com.espindola.lobwebapp.exception.customerinvalidexception"),
	CUSTOMERNOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.customernotfoundexception"),
	
	ORDERALREADYEXITS_EXCEPTION("com.espindola.lobwebapp.exception.orderalreadyexistsexception"),
	ORDERINVALID_EXCEPTION("com.espindola.lobwebapp.exception.orderinvalidexception"),
	ORDERNOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.ordernotfoundexception"),
	
	STOCKALREADYEXITS_EXCEPTION("com.espindola.lobwebapp.exception.stockalreadyexistsexception"),
	STOCKINVALID_EXCEPTION("com.espindola.lobwebapp.exception.stockinvalidexception"),
	STOCKNOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.stocknotfoundexception"),
	
	USERALREADYEXITS_EXCEPTION("com.espindola.lobwebapp.exception.useralreadyexistsexception"),
	USERINVALID_EXCEPTION("com.espindola.lobwebapp.exception.userinvalidexception"),
	USERNOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.usernotfoundexception"), 
	
	//VALIDATION
	
	PRODUCTINVALID_VALIDATION("com.espindola.lobwebapp.validation.productinvalid"),
	PRODUCTIDINVALID_VALIDATION("com.espindola.lobwebapp.validation.productidinvalid"),
	PRODUCTNAMEINVALID_VALIDATION("com.espindola.lobwebapp.validation.productnameinvalid"),
	PRODUCTDESCRIPTIONINVALID_VALIDATION("com.espindola.lobwebapp.validation.productdescriptioninvalid"),
	PRODUCTCOSTPRICEINVALID_VALIDATION("com.espindola.lobwebapp.validation.productcostpriceinvalid"),
	PRODUCTPRICEINVALID_VALIDATION("com.espindola.lobwebapp.validation.productpriceinvalid"),
	PRODUCTCATEGORYINVALID_VALIDATION("com.espindola.lobwebapp.validation.productcategoryinvalid"),
	PRODUCTNCMINVALID_VALIDATION("com.espindola.lobwebapp.validation.productncminvalid"),
	
	;
	
	private String messageKey;

	MessageKey(String messageKey){
		this.messageKey = messageKey;
	}

	public String getMessageKey() {
		return messageKey;
	}

}