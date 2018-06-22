var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var {ipcRenderer} = require('electron');
var remote = electron.remote;
var entries = require('../entries.json');
var modalId = '#editModale';
var utils   = require('./utils');

function proceed(){

    $('.datatable tfoot th').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    });


    var container = document.getElementById('listContainer');
    var strHtml = '';
    $.each(entries, function(index, definitions){
      strHtml += '<tr>';
        strHtml += '<td>';
          strHtml += index;
        strHtml += '</td>';
        strHtml += '<td>';
          strHtml += definitions.join(',');
        strHtml += '</td>';
        strHtml += '<td>';
          strHtml += '<button type="button" class="btn btn-xs editBtn" data-word="'+ index +'"><i class="material-icons">edit</i></button>'
        strHtml += '</td>';
      strHtml += '</tr>';
    });
    if (container !== null){
      container.innerHTML = strHtml;
      var table = $('.datatable').DataTable({
        pageLength: 10,
        searching: true,
        "search": {
          "smart": false,
          "regex" : true
        }
      });
      table.columns().every( function () {
        var that = this;
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search(this.value, true, false)
                    .draw();
            }
        });
      });
    }

  $('#transAction').off('click');
  $('#transAction').on('click', function(){
    translate();
  });

  $('.editBtn').off('click');
  $('.editBtn').on('click', function(){
    var word = $(this).data('word');
    editWord(word);
  });
}

function translate(){
 var input = document.getElementById('trans');
 console.log('start translation', input.value);
 var container = document.getElementById('transResult');
 if (input.value){
   var result = [];
   var words = input.value.split(' ');
   $.each(words, function(index, inVal){
     var match = null;
     $.each(entries, function(word, definitions){
        if (definitions.indexOf(inVal.trim().toLowerCase()) > -1){
          match = word;
          return false;
        }
     });
     if (match == null){
       result.push('['+inVal+']');
     }else {
       result.push(match);
     }
   });
   console.log('end translation', result);
   
   container.innerText = result.join(' ');
 }
}

function displayError(msg){
  var container = document.getElementById('errorContainer');
  $(container).removeClass('d-none');
  container.innerText += '<br/>' + msg;
}

function editWord(word){
  var modal = $(modalId);
  var entry = entries[word];
  $('#word').val(word);
  $('#modal-word').data('word', word);
  $('#definitions').val(entry.join(','));
  modal.modal('show');
  
  $('#editBtnAction').off('click');
  $('#editBtnAction').on('click', function(){
    var editWord = $('#word').val();
    var editDef  = $('#definitions').val();
    if (editWord !== '' && editDef !== ''){
      var arDef = editDef.split(',');
      if (utils.checkExistWord(newword)){
        displayError('Word ' + newword + ' already exist !');
        return false;
      }
      arDef = utils.removeDuplicateDef($, arDef, displayError, null);
    }
  });
}

function requestList(){
  ipcRenderer.send('requestList');
}

function requestAdd(){
  ipcRenderer.send('requestAdd');
}


