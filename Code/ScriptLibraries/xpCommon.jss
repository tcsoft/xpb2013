function init(){
	processDocumentLocking();
}

function processDocumentLocking(){
	/*
	 * Document Locking
	 * Each screen should clear lock record from applicationScope on Cancel or Save
	 */
	if (context.getUrlParameter("documentId") != "" && context.getUrlParameter("action").toLowerCase() == "editdocument"){
		//We need to deal with document locking
		if (!applicationScope.containsKey("documentlocks")){
			applicationScope.documentlocks = new java.util.Hashtable();
		}
		var hash:java.util.Hashtable = applicationScope.documentlocks;
		if (hash.containsKey(context.getUrlParameter("documentId"))){
			var lock = hash.get(context.getUrlParameter("documentId"));
			if (lock.person == @UserName()){
				//We're OK
			}else{
				//The document is locked by someone else so set the viewScope variable
				viewScope.locked = lock;
			}
		}else{
			var lock = new DocumentLock();
			lock.unid = context.getUrlParameter("documentId");
			lock.person = @UserName();
			lock.time = new java.util.Date();
			hash.put(lock.unid, lock);
			applicationScope.documentlocks = hash;
		}
	}else if (context.getUrlParameter("documentId") != "" && context.getUrlParameter("action").toLowerCase() == "opendocument"){
		//We need to deal with document locking
		if (!applicationScope.containsKey("documentlocks")){
			applicationScope.documentlocks = new java.util.Hashtable();
		}
		var hash:java.util.Hashtable = applicationScope.documentlocks;
		if (hash.containsKey(context.getUrlParameter("documentId"))){
			var lock = hash.get(context.getUrlParameter("documentId"));
			if (lock.person == @UserName()){
				//We need to remove the lock as we're now in read mode
				//(we shouldn't really get here)
				unlockDocument(context.getUrlParameter("documentId"));
			}else{
				//The document is locked by someone else so set the viewScope variable
				viewScope.locked = lock;
			}
		}
	}
	/*
	 * End Document Locking
	 */
}

function unlockDocument(unid){
	if (applicationScope.containsKey("documentlocks")){
		var hash:java.util.Hashtable = applicationScope.documentlocks;
		if (hash.containsKey(unid)){
			var lock = hash.get(unid);
			if (lock.person == @UserName()){
				hash.remove(unid);
				applicationScope.documentlocks = hash;
			}
		}
	}
}

var DocumentLock = function(){
	this.unid;
	this.person;
	this.time;
}