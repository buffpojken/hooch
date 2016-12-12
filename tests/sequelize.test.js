let assert 			= require("assert"); 
let hooch 			= require('./../index.js')		
let Sequelize 		= require('sequelize')

let sequelize = new Sequelize('hooch_test', 'hooch', 'hooch');

let Project = sequelize.define('Project', {
	title: Sequelize.STRING, 
	description: Sequelize.TEXT
})

hooch.sequelize = sequelize

describe('Hooch with Sequelize', function(){

	beforeEach(function(){
		hooch.permit({activity: "test.allowed", forItem: Project, givenThat: (user, item, activity) => {
			return true
		}}); 

		hooch.permit({activity: "test.rejected", forItem: Project, givenThat: (user, item, activity) => {
			return false
		}}); 
	})

	it('should pass for instances', function(done){
		let project = Project.build({})
		hooch.allow({user: "user", isAllowedTo: 'test.allowed', forItem: project}).then(res => {
			assert(res)
			done()
		})
	});

	it('should reject for instances', function(done){
		let project = Project.build({})
		hooch.allow({user: "user", isAllowedTo: 'test.rejected', forItem: project}).then(res => {
			assert(false)
		}).catch(hooch.AuthorizationError, function(err){
			done()
		})
	})

	afterEach(function(){
		hooch.reset();
	})
	
});