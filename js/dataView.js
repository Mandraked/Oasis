
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

$(document).ready(function () {
	var table = $('#patientSurveys').DataTable();

	$('#patientSurveys').on('click', 'tr', function () {
	  if ($(this).hasClass('selected')) {
	    $(this).removeClass('selected');
	    $(this).removeClass('selectedSurvey');
	  }
	  else {
	    table.$('tr.selected').removeClass('selected');
	    table.$('tr.selected').removeClass('selectedSurvey');
	    $(this).addClass('selected');
	    $(this).addClass('selectedSurvey');
	  }
	});
});

var patientId = getUrlVars()['patientId'];

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

$('#openResults').on('click', function() {
	var surveyName = $('#patientSurveys').find('.selectedSurvey td').html();
	
	var surveyId = getSurveyIdByName(surveyName);

	console.log(patientId);
	console.log(surveyName, surveyId);
	//$('#openResults').attr('href', '#'+surveyId+'/'+patientId);
});

function fillSurveyTable(surveys)
{
	surveys.forEach(function (temp) {
		$('#patientSurveys').append('<tr><td>'+temp.name+'</td></tr>');;
	});
}

var surveyList = apiFindAllSurveys();
fillSurveyTable(surveyList);

function p()
{
	this.firstName = 'Bradley';
	this.lastName = 'Davis';
	this.lastInteraction = 'idk';
}

var patient = new p();//apiFindPatientById(patientId);

document.getElementById('patientName').innerHTML = patient.firstName+' '+patient.lastName;
document.getElementById('patientMedNumber').innerHTML = patient.medicalId;
document.getElementById('patientPhoneNumber').innerHTML = 'temp phone number';
document.getElementById('patientLastVisit').innerHTML = patient.lastInteraction;