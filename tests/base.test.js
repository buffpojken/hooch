let assert 			= require("assert"); 
let hooch 			= require('./../index.js')		

describe('Hooch', function(){

	before(function(){
		hooch.permit({activity: "test.allowed", forItem: "1", givenThat: (user, item, activity) => {
			return true
		}}); 

		hooch.permit({activity: "test.array.allowed", forItem: [1,2,3], givenThat: (user, item, activity) => {
			return true
		}})
	})

	it('should pass for simple value types', function(done){
		hooch.allow({user: "user", isAllowedTo: 'test.allowed', forItem: '1'}).then(res => {
			assert(res)
			done()
		})
	});

	it('should pass for complex value types', function(done){
		hooch.allow({user: "user", isAllowedTo: "test.array.allowed", forItem: [1,2,3]}).then(res => {
			assert(res);
			done()
		})
	});

	it('should reject undefined permit requests', function(done){
		hooch.allow({user: 'user', isAllowedTo: 'undefined.permit', forItem: "something"}).then(res => {
			assert.deepEqual(res, false);
			done();
		})
	});

	// Test that missing or nullifying an argument should error out!

});