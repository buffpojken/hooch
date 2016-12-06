"use strict";
const _           = require('lodash')
const Promise     = require('bluebird')
try{
  var Sequelize   = require('sequelize')  
}catch(e){
  var Sequelize   = null;
}

let library = {};

let resolveIdentity = function(item){
  if(Sequelize){
    // This is an actual Sequelize-model
    if(item instanceof Sequelize.Model){
      return item
    }
  }else{

  }
}

let permit = ({activity = null, forItem = null, givenThat = null} = {}) => {
  if(!activity || !forItem || !givenThat){ throw new Error("hooch#permit is missing a parameter. This is a fatal error due to security concerns.") }
  if(!library[activity]){
    library[activity] = {}
  }

  let identity = resolveIdentity(forItem)

  if(!library[activity][identity]){
    library[activity][identity] = [];
  }

  library[activity][identity].push(givenThat)
}

let allowed = ({user = user, isAllowedTo = null, forItem = null} = {}) => {
  return Promise.resolve(forItem).then(item => {

  })
}

// hooch.allowed({user: user, isAllowedTo: "edit.circle", forItem: itemOrPromise}).then(item => {

// }).catch(hooch.AuthorizationError, function(exception) => {

// })

function AuthorizationError() {
      this.error = true;
};
AuthorizationError.prototype = Object.create(Error.prototype);

module.exports = {
  permit: permit, 
  AuthorizationError: AuthorizationError
}