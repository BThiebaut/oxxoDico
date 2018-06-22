var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var {ipcRenderer} = require('electron');
var remote = electron.remote;
var entries = require('../entries.json');
var fs = require('fs');

this.checkExistWord = function(word){
  return typeof entries[word] != 'undefined';
};

this.removeDuplicateDef = function($, arDef, errorFn){
  $.each(arDef, function(i, cdef){
    arDef[i] = cdef.trim().toLowerCase();
    $.each(entries, function(word, definitions){
      if (definitions.indexOf(cdef) > -1){
        errorFn('Definition ' + cdef + ' already exist in ' + word + '. Skipped');
        arDef.splice(i, 1);
        return;
      }
    });
  });
  return arDef;
};

this.saveDicoAsync = function(dico, callback){
  // order the dictionnary
  var ordered = {};
  Object.keys(dico).sort().forEach(function(key) {
    ordered[key] = dico[key];
  });

  // Save to file
 fs.writeFile('./entries.json', JSON.stringify(ordered, null, 2), (err) => {
    if(err){
      alert("An error ocurred creating the file "+ err.message)
      return;
    }
    callback(err);
  });
};