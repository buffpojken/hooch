let assert      = require("assert"); 
let hooch       = require('./../index.js')    

describe('Hooch Tuples', function(){

  describe('creation', function(){

    it('should allow valid tuples to be created with number-reference', function(){
      let tuple = hooch.tuple('monkey', 1)
      assert(tuple.key == 'monkey')
    })

    it('should allow valid tuples to be created with string-reference', function(){
      let tuple = hooch.tuple('monkey', "kalle")
      assert(tuple.key == 'monkey')
    })

    it('should not allow tuples to be created with complex reference', function(){
      assert.throws(function(){
        let tuple = hooch.tuple('monkey', [1,2,3])
      })
    })

    it('should not allow tuples to be created with object reference', function(){
      assert.throws(function(){
        let tuple = hooch.tuple('monkey', {kalle: "hugo"})
      })
    })

    it('should not allow tuples to be created with missing reference', function(){
      assert.throws(function(){
        let tuple = hooch.tuple('monkey')
      })
    })

    it('should not allow tuples to be created with complex reference', function(){
      assert.throws(function(){
        let tuple = hooch.tuple('monkey', [1,2,3])
      })
    })

    it('should allow reading tuple values', function(){
      let tuple = hooch.tuple('monkey', "hugo")
      assert.equal(tuple.reference, "hugo")
    })
  })

  describe('ability checking', function(){
    before(function(){
      hooch.permit({activity: "test.number.allowed", forItem: "tuple.number", givenThat: (user, item, activity) => {
        return true
      }}); 

      hooch.permit({activity: "test.string.allowed", forItem: "tuple.string", givenThat: (user, item, activity) => {
        return true
      }})
    })

    it('should be able to be matched in an ability check with numbers', function(done){
      hooch.allow({user: "user", isAllowedTo: "test.number.allowed", forItem: hooch.tuple('tuple.number', 1)}).then(res => {
        assert(res);
        done()
      })
    })

    it('should be able to be matched in an ability check with strings', function(done){
      hooch.allow({user: "user", isAllowedTo: "test.string.allowed", forItem: hooch.tuple('tuple.string', "kalle")}).then(res => {
        assert(res);
        done()
      })
    })

    it('should reject unmatched tuples', function(done){
      hooch.allow({user: "user", isAllowedTo: "test.string.allowed", forItem: hooch.tuple('tuple.string.unmatched', "kalle")}).then(res => {
        assert(false);
      }).catch(hooch.AuthorizationError, function(err){
        done();
      })
    })


  })

});