"use strict";
const _           = require('lodash')
const Promise     = require('bluebird')
const assert      = require('assert');
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
    }else{
      return item
    }
  }else{
    return item;
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
  if(!user || !isAllowedTo || !forItem){
    throw new Error("hooch#allowed is missing one or more parameters. This is a fatal error due to security concerns.")
  }
  return Promise.resolve(forItem).then(item => {
    if(library[isAllowedTo] && library[isAllowedTo][item]){
      return Promise.all([item, library[isAllowedTo][item]])
    }else{
      return Promise.all([item, []])
    }
  }).spread((item, permits) => {
    return Promise.reduce(permits, function(returnValue, permit){
      return Promise.resolve(permit(item, user, isAllowedTo)).then(res => {
        assert(typeof(res) === "boolean"); 
        returnValue = res; 
        return returnValue;
      })
    }, false);
  })
}

function AuthorizationError() {
      this.error = true;
};
AuthorizationError.prototype = Object.create(Error.prototype);

module.exports = {
  permit: permit, 
  allow: allowed,
  AuthorizationError: AuthorizationError
}