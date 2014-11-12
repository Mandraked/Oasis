$(document).ready(function () {
	var table1 = $('#patientTable').DataTable();
	var table2 = $('#surveyTable').DataTable();

	$('#patientTable').on('click', 'tr', function () {
	  if ($(this).hasClass('selected')) {
	    $(this).removeClass('selected');
	    $(this).removeClass('selectedName');
	  }
	  else {
	    table1.$('tr.selected').removeClass('selected');
	    table1.$('tr.selected').removeClass('selectedName');
	    $(this).addClass('selected');
	    $(this).addClass('selectedName');
	  }
	});

	$('#surveyTable').on('click', 'tr', function () {
	  if ($(this).hasClass('selected')) {
	    $(this).removeClass('selected');
	    $(this).removeClass('selectedSurvey');
	  }
	  else {
	    table2.$('tr.selected').removeClass('selected');
	    table2.$('tr.selected').removeClass('selectedSurvey');
	    $(this).addClass('selected');
	    $(this).addClass('selectedSurvey');
	  }
	});
});

$('#openSurvey').on('click', function() {
	$('#openSurvey').attr('href', 'http://www.google.com');
});

var patientList = findAllPatients();
var surveyList = findAllSurveys();

// function that takes in an array of patient names to populate the table
function fillPatientTable(names)
{
	names.forEach(function (temp) {
		$('#patientTable').append('<tr><td>'+temp.firstName+' '+temp.lastName+'</td></tr>');;
	});
}

function fillSurveyTable(surveys)
{
	surveys.forEach(function (temp) {
		$('#surveyTable').append('<tr><td>'+temp.name+'</td></tr>');;
	});
}

function numberOfPatients(names)
{
	try {
		document.getElementById('patientNumber').innerHTML = names.length;
	} catch (e) {

	}
}

fillPatientTable(patientList);
fillSurveyTable(surveyList);
numberOfPatients(patientList);