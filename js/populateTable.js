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

var patientList = apiFindAllPatients();
var surveyList = apiFindAllSurveys();

function getPatientIdByName(temp)
{
	var id = '';
	var first = '';
	var last = '';

	try {
		first = temp.split(' ')[0];
		last = temp.split(' ')[1];
	} catch (e) {

	}

	patientList.forEach(function (name) {
		if (name.firstName == first && name.lastName == last)
		{
			id = name.patientId;
		}
	});

	return id;
}

function getSurveyIdByName(temp)
{
	var id = '';

	surveyList.forEach(function (name) {
		if (name.name == temp)
		{
			id = name.id;
		}
	});

	return id;
}

$('#viewDataButton').on('click', function() {
	var path = './viewData.html';
	var patientName = $('#patientTable').find('.selectedName td').html();

	if (! patientName)
	{
		document.getElementById('viewDataFail').innerHTML = "Must select a patient first";
		return;
	}
	var patientId = getPatientIdByName(patientName);

	$('#viewDataButton').attr('href', './viewData.html?patientId='+patientId);
});

$('#openSurvey').on('click', function() {
	var patientName = $('#patientTable').find('.selectedName td').html();
	var surveyName = $('#surveyTable').find('.selectedSurvey td').html();
	
	var patientId = getPatientIdByName(patientName);
	var surveyId = getSurveyIdByName(surveyName);

	console.log(patientName, patientId);
	console.log(surveyName, surveyId);
	$('#openSurvey').attr('href', 'http://54.173.152.217/api/surveys/start/'+surveyId+'/'+patientId);
});

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