package com.espindola.lobwebapp.exception;

import java.util.Locale;

import org.springframework.context.MessageSource;

import com.espindola.lobwebapp.controller.response.MessageResponse;
import com.espindola.lobwebapp.l10n.MessageKey;

public class LobWebAppException extends RuntimeException {

	private static final long serialVersionUID = -8906012587863340255L;
	private MessageKey messageKey;
	private Object[] messageArgs;

	public LobWebAppException(String message) {
		super(message);
	}

	protected LobWebAppException(MessageKey messageKey, Object[] messageArgs) {
		super(messageKey.getKey() + " " + messageArgs.toString());
		this.setMessageKey(messageKey);
		this.setMessageArgs(messageArgs);
	}

	public MessageResponse getMessageResponse(MessageSource messageSource,
			Locale locale) {
		return new MessageResponse(messageSource.getMessage(this
				.getMessageKey().getKey(), this.getMessageArgs(), locale));
	}

	public Object[] getMessageArgs() {
		return messageArgs;
	}

	protected void setMessageArgs(Object[] messageArgs) {
		this.messageArgs = messageArgs;
	}

	public MessageKey getMessageKey() {
		return messageKey;
	}

	protected void setMessageKey(MessageKey messageKey) {
		this.messageKey = messageKey;
	}
}