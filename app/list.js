var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var {ipcRenderer} = require('electron');
var remote = electron.remote;
var entries = require('../entries.json');


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
        } );
    } );
    }
}
