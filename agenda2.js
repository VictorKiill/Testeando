var Cal = function(divId) {

  //Store div id
  this.divId = divId;

  // Days of week, starting on Sunday
  this.DaysOfWeek = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
  ];

  // Months, stating on January
  this.Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];

  // Set the current month, year
  var d = new Date();

  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();

};

// Goes to next month
Cal.prototype.nextMonth = function() {
  if ( this.currMonth == 11 ) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  }
  else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};

// Goes to previous month
Cal.prototype.previousMonth = function() {
  if ( this.currMonth == 0 ) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  }
  else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};

// **************************************************************************
//Escreve os eventos

    function mostrarEventos(y, m, d, listEvents, hoje) {
        var passo;
        var redAlert;
        var days;
        var dataDay;
        for (passo = 0; passo < listEvents.length; passo++) {
            var datahoraI = listEvents[passo]['startdate'].split("-");
            var anoI = datahoraI[0];
            var mesI = datahoraI[1];
            var diaI = datahoraI[2].substring(0, 2);
            /*var datahoraF = listEvents[passo]['enddate'].split("-");
            var anoF = datahoraI[0];
            var mesF = datahoraI[1];
            var diaF = datahoraI[2].substring(0, 2);*/
            if (anoI == y.toString() && mesI == (m + 1).toString() && diaI == d.toString()) {
                redAlert = '<img src="dgj.png" alt="AlertEvent Icon">';
            }
        }
        if (redAlert == undefined){
            redAlert = '';
        }
        dataDay = y.toString() + '-' + m.toString() + '-' + d.toString();
        if (hoje == true){
            days = '<td class="p-sm-1"><a class="btn text-white w-100" style="background: #59CAB8" data-toggle="modal" data-target="#exampleModalCenter" data-date=dataDay >' + d + redAlert + '</a></td>';
        } else {
            days = '<td class="p-sm-1 today"><a class="btn border-secondary w-100" style="color: #59CAB8" data-toggle="modal" data-target="#exampleModalCenter"  data-date=dataDay >' + d + redAlert + '</a></td>';
        }

        return days;
    }

// **************************************************************************

// Show current month
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
};

// Show month (year, month)
Cal.prototype.showMonth = function(y, m) {

  var d = new Date()
  // First day of the week in the selected month
  , firstDayOfMonth = new Date(y, m, 1).getDay()
  // Last day of the selected month
  , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
  // Last day of the previous month
  , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();


  var html = '<table class="">';

  // Write selected month and year
  html += '<thead class=""><tr>';
  html += '<td colspan="7" class="rounded-top text-white" style="background: #59CAB8">' + this.Months[m] + ' ' + y + '</td>';
  html += '</tr></thead>';


  // Write the header of the days of the week
  html += '<tr class="days">';
  for(var i=0; i < this.DaysOfWeek.length;i++) {
    html += '<td style="color: #59CAB8">' + this.DaysOfWeek[i] + '</td>';
  }
  html += '</tr>';

  // Write the days
  var i=1;
  do {

    var dow = new Date(y, m, i).getDay();

    // If Sunday, start new row
    if ( dow == 0 ) {
      html += '<tr>';
    }
    // If not Sunday but first day of the month
    // it will write the last days from the previous month
    else if ( i == 1 ) {
      html += '<tr>';
      var k = lastDayOfLastMonth - firstDayOfMonth+1;
      for(var j=0; j < firstDayOfMonth; j++) {
        html += '<td class="text-white rounded p-sm-1" ><div class="btn w-100 disabled" style="background: #59CAB8">'+ k + '</div></td>';
        k++;
      }
    }

    // Write the current day in the loop
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += mostrarEventos(this.currYear, this.currMonth, i, eventos, true);
    } else {
      html += mostrarEventos(this.currYear, this.currMonth, i, eventos, false);
    }
    // If Saturday, closes the row
    if ( dow == 6 ) {
      html += '</tr>';
    }
    // If not Saturday, but last day of the selected month
    // it will write the next few days from the next month
    else if ( i == lastDateOfMonth ) {
      var k=1;
      for(dow; dow < 6; dow++) {
        html += '<td class="text-white rounded p-sm-1"><div class="btn w-100 disabled" style="background: #59CAB8">' + k + '</></td>';
        k++;
      }
    }

    i++;
  }while(i <= lastDateOfMonth);

  // Closes table
  html += '</table>';

  // Write HTML to the div
  document.getElementById(this.divId).innerHTML = html;
};

// On Load of the window
window.onload = function() {

  // Start calendar
  var c = new Cal("divCal");			
  c.showcurr();

  // Bind next and previous button clicks
  getId('btnNextt').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrevv').onclick = function() {
    c.previousMonth();
  };
}

// Get element by id
function getId(id) {
  return document.getElementById(id);
}