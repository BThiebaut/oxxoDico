var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var {ipcRenderer} = require('electron');
var remote = electron.remote;
var entries = require('../entries.json');
var fs = require('fs');
var utils = require('./utils');

function requestList(){
  ipcRenderer.send('requestList');
}

function requestAdd(){
  ipcRenderer.send('requestAdd');
}

function displayError(msg){
  var container = document.getElementById('errorContainer');
  $(container).removeClass('d-none');
  container.innerText += '<br/>' + msg;
}

function loadEvents(){
  $('#addBtn').off('click');
  $('#addBtn').on('click', function(){
    proceedAdd();
  });
}

function proceedAdd (){
  console.log('start add');
  var newword = document.getElementById('word').value.trim().toLowerCase();
  var def = document.getElementById('definitions').value.trim().toLowerCase();
  if (word !== '' && def !== ''){
    var arDef = def.split(',');
    // check if is already in dictionnary
    if (utils.checkExistWord(newword)){
      displayError('Word ' + newword + ' already exist !');
      return false;
    }
    arDef = utils.removeDuplicateDef($, arDef, displayError, null);

    // Save the new word
    if (arDef.length > 0){
      console.log('add ' + newword, arDef);
      entries[newword] = arDef;
      utils.saveDicoAsync(entries, function(err){
        if (!err){
          alert("New entry succesfully added");
          $('input').val('');
        }
      });
    }else {
      displayError('All definitions has been skipped. Action canceled');
    }
    console.log('end add');
  }
}

function requestList(){
  ipcRenderer.send('requestList');
}

function requestAdd(){
  ipcRenderer.send('requestAdd');
}
