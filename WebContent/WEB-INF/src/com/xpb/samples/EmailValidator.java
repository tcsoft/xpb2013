package com.xpb.samples;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import javax.faces.application.FacesMessage;

public class EmailValidator implements Validator {
	public void validate(FacesContext context, UIComponent component, Object value) {
		org.apache.commons.validator.routines.EmailValidator validator = 
			org.apache.commons.validator.routines.EmailValidator.getInstance();
		String email = (String)value;
        if (!validator.isValid(email)){
        	throw new ValidatorException(
        			new FacesMessage("The email address is invalid"));
        }else{
        	//We've passed validation
        }
	}
}
