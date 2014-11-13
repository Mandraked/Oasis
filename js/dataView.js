
function getUrlVars()
{
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function dateConvert(epoch)
{
	var d = new Date(0);
	d.setUTCSeconds(epoch);
	return d;
}

$('#backButton').on('click', function () {
	window.history.back();
});

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
var surveyIdNum = getUrlVars()['surveyId'];

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
	$('#openResults').attr('href', './viewResults.html?surveyId='+surveyId+'&patientId='+patientId);
});

function fillSurveyTable(surveys)
{
	surveys.forEach(function (temp) {
		$('#patientSurveys').append('<tr><td>'+temp.name+'</td></tr>');;
	});
}

var surveyList = apiFindAllSurveys();
fillSurveyTable(surveyList);

var patient = apiFindPatientById(patientId);

try {
	document.getElementById('patientName').innerHTML = patient.firstName+' '+patient.lastName;
	document.getElementById('patientMedNumber').innerHTML = patient.medicalId;
	document.getElementById('patientLastVisit').innerHTML = dateConvert(patient.lastInteraction);
} catch (e) {

}

function loadResults()
{
	var surveyResults = apiFindSurveyResultsByIds(patientId, surveyIdNum);

	var definition = surveyResults.definition;
	var data = surveyResults.data;
	console.log(data[0].data);
	var num = Object.keys(definition).length;
	var numResponses = Object.keys(data).length;

	var str = '';

	for (var i=0; i<numResponses; i++)
	{
		for (var j=0; j<num; j++)
		{
			str += definition[j] + '<br>';
			str += data[i].data[j] + '<br>';
			str += '<br>';
		}
	}

	document.getElementById('placeHere').innerHTML = str;
}









