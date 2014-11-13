
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

$('#graphResults').on('click', function() {
	$('#graphResults').attr('href', './graphableResults.html?patientId='+patientId);
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

var active = '';

function setActiveChart(v)
{
	active = v;
}

function loadCharts()
{
	var base1 = '<li><a id="';
	var base2 = '" onclick=setActiveChart(this.id)">';
	var base3 = '</a></li>';
	var str = '';

	var num = Object.keys(surveyList).length;
	for (var i=0; i<num; i++)
	{
		str += base1+surveyList[i]['name']+base2+surveyList[i]['name']+base3;
	}
	console.log(str);
	document.getElementById('dropdownList').innerHTML = str;

	$('#highGraph').highcharts({
		title: {
			text: "I have no idea what I'm doing",
			x: -20
		},
		subtitle: {
			text: 'Hi John',
			x: -20
		},
		xAxis: {
			categories: ['Jan','Feb','Mar']
		},
		yAxis: {
			title: {
				text: 'Pull to Chill Ratio'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		series: [{
			name: 'idk',
			data: [1,5,2,3]
		}]
	});
}







