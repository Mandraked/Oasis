$('#highGraph').highcharts({
	title: {
		text: 'active',
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

var chart = $('#highGraph').highcharts();

var active = '';
var patientId = getUrlVars()['patientId'];
var patient = apiFindPatientById(patientId);

document.getElementById('patientName').innerHTML = patient.firstName+' '+patient.lastName;

function buildQuestionTable(name)
{
	var survey = getSurveyIdByName(name);
	active = name;
	if (survey)
	{
		var surveyResult = apiFindSurveyResultsByIds(patientId, survey);

		$('#surveyQuestions').empty();
		$('#surveyQuestions').append('<tr><td>'+surveyResult.definition[0]+'</td></tr>');
		$('#surveyQuestions').append('<tr><td>'+surveyResult.definition[1]+'</td></tr>');
	}
}

function buildChart(questionName)
{
	var surveyId = getSurveyIdByName(active);
	console.log(surveyId);
	var surveyResult = apiFindSurveyResultsByIds(patientId, surveyId);
	
	var results = surveyResult.data;
	var num = Object.keys(results).length;
	var num2 = Object.keys(results[0]).length;

	var d = [];
	var dates = [];
	var normalDates = [];
	//console.log(results[1].date);
	//console.log(results[1]);

	for (var i=0; i<num; i++)
	{
		d.push(results[i].data[1]);
		dates.push(results[i].date);
	}

	// for (var i=0; i<num; i++)
	// {
	// 	d2.push(results[i].data[0]);
	// 	dates.push(results[i].date);
	// }

	dates.forEach(function (each) {
		normalDates.push(dateConvert(each)); 
	});

	//console.log(normalDates);

	$('#highGraph').highcharts({
		title: {
			text: active,
			x: -20
		},
		xAxis: {
			title: {
				text: 'Values'
			},
			categories: normalDates
		},
		series: [{
			name: questionName,
			data: d
		}]
	});
}

$(document).ready(function () {
	var table = $('#surveyQuestions').DataTable();

	$('#surveyQuestions').on('click', 'tr', function () {
	  if ($(this).hasClass('selected')) {
	    $(this).removeClass('selected');
	    $(this).removeClass('selectedQuestion');
	  }
	  else {
	    table.$('tr.selected').removeClass('selected');
	    table.$('tr.selectedQuestion').removeClass('selectedQuestion');
	    $(this).addClass('selected');
	    $(this).addClass('selectedQuestion');
	  }
	});
});

$('#surveyQuestions').on('click', 'tr', function () {
	var text = $(this).find($('.selectedQuestion td')).context.innerHTML;
	text = text.split('>')[1].split('<')[0];
	console.log(text);
	buildChart(text, active);
});

function setActive(temp)
{
	buildQuestionTable(temp.innerHTML);
}

var base1 = '<li><a id="dropdownItem" onclick="setActive(this)">';
var base3 = '</a></li>';
var str = '';

var num = Object.keys(surveyList).length;
for (var i=0; i<num; i++)
{
	str += base1+surveyList[i]['name']+base3;
}
document.getElementById('dropdownList').innerHTML = str;


