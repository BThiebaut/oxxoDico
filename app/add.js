var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var {ipcRenderer} = require('electron');
var remote = electron.remote;
var entries = require('../entries.json');
var fs = require('fs');

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
  var newword = document.getElementById('word').value;
  var def = document.getElementById('definitions').value;
  if (word !== '' && def !== ''){
    var arDef = def.split(',');
    // check if is already in dictionnary
    if (typeof entries[newword] != 'undefined'){
      displayError('Word ' + newword + ' already exist !');
      return false;
    }
    $.each(arDef, function(i, cdef){
      $.each(entries, function(word, definitions){
        if (definitions.indexOf(cdef) > -1){
          displayError('Definition ' + cdef + ' already exist in ' + word + '. Skipped');
          arDef.splice(i, 1);
          return;
        }
      });
    });
    // Save the new word
    if (arDef.length > 0){
      console.log('add ' + newword, arDef);
      entries[newword] = arDef;

     fs.writeFile('./entries.json', JSON.stringify(entries, null, 2), (err) => {
        if(err){
          alert("An error ocurred creating the file "+ err.message)
          return;
        }
        alert("The file has been succesfully saved");
        $('input').val('');
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
