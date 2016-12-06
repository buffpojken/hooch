let assert 			= require("assert"); 
let hooch 			= require('./../index.js')		

describe('The Example test', function(){

	it('should pass', function(){
		hooch.permit({activity: "monkey", forItem: "Mungo", givenThat: (user, item) => {
			
		}})
		assert(true)
	});

});