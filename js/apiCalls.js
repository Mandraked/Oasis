function findAllPatients()
{
	var patients = [];
	$.ajax({
		url: 'http://54.173.152.217/api/patients/find/any',
		async: false,
		dataType: 'json',
		success: function(data) {
			patients = data;
		}
	});
	return patients;
}

function findAllSurveys()
{
	var surveys = [];
	$.ajax({
		url: 'http://54.173.152.217/api/surveys/findAll',
		async: false,
		dataType: 'json',
		success: function(data) {
			surveys = data;
		}
	});
	return surveys;
}