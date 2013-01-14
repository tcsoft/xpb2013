package com.xpb.samples;

import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Logging {
	private final static Logger logger = Logger.getLogger(Logging.class.getName());
	public Logging(){
		try{
			String filename = "%t/log%u.log";
			int sizeLimit = 5000;
			int backupLimit = 3;
			FileHandler fh = new FileHandler(filename, sizeLimit, backupLimit);
			fh.setEncoding("UTF-8");
			fh.setLevel(Level.FINEST);
			logger.addHandler(fh);
		}catch(Exception e){
			logger.severe(e.getMessage());
		}
	}
	
	public void log(String message){
		logger.info(message);
	}
	
	public void testMethod(){
		logger.info("Called testMethod");
		try{
			throw new Exception("an error has happened");
		}catch(Exception e){
			logger.severe(e.getMessage());
		}
	}
}
