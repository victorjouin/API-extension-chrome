Meteor.methods({
	loginFromExtension: function(username, password){
		try {
			if (ApiPassword.isPasswordValid(username, password)) {
			  console.log('password is valid for this user');
			  return true;
			} else {
				return 'Password is not valid.'
			}
		} catch (exc) {
	    console.log(exc.message);
	    return exc.message;
		}
	}
});
/*
Meteor.methods({
	loginFromExtension: function(name, firstname, tel, email, adresse){
		try {
			if (ApiPassword.isPasswordValid(name, firstname,tel,email,adresse)) {
			  console.log('password is valid for this user');
			  return true;
			} else {
				return 'Password is not valid.'
			}
		} catch (exc) {
	    console.log(exc.message);
	    return exc.message;
		}
	}
});*/