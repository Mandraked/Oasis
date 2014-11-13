function apiFindAllPatients()
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

function apiFindPatientById()
{

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