package com.xpb.samples;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import javax.faces.application.FacesMessage;

public class EmailValidatorFred implements Validator {
	public void validate(FacesContext context, UIComponent component, Object value) {
		String email = (String)value;
        if (!email.equalsIgnoreCase("fred")){
        	throw new ValidatorException(
        			new FacesMessage("You must enter Fred"));
        }else{
        	//We've passed validation
        }
	}
}
