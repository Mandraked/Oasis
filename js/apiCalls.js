function apiFindAllPatients()
{
	var patients = [];
	$.ajax({
		url: 'http://54.173.152.217/api/patients/find/all',
		async: false,
		dataType: 'json',
		success: function(data) {
			patients = data;
		}
	});
	return patients;
}

function apiFindPatientById(id)
{
	var patient = [];
	$.ajax({
		url: 'http://54.173.152.217/api/patients/'+id,
		async: false,
		dataType: 'json',
		success: function(data) {
			patient = data;
		}
	});
	return patient;
}

function apiFindAllSurveys()
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

function apiFindSurveyResultsByIds(patientId, surveyId)
{
	var results = [];
	$.ajax({
		url: 'http://54.173.152.217/api/surveys/responses/'+surveyId+'/'+patientId,
		async: false,
		dataType: 'json',
		success: function(data) {
			results = data;
		}
	});
	return results;
}

function apiCreatePatient(data)
{
	var t = [];

	$.ajax({
		type: "POST",
		url: "http://54.173.152.217/api/patients/create",
		data: JSON.stringify(data),
		processData: false,
		dataType: "json",
		contentType: "application/json"
		})
		.done(function(d) {
			t = d;
		});
		return t;
}

function makeDataForCreate(medicalId, firstName, lastName)
{
	var data = {};

	data.medicalId = medicalId;
	data.firstName = firstName;
	data.lastName = lastName;

	return data;
}