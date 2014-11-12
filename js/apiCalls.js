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
		url: 'http://54.173.152.217/api/patients/create',
		data: data,
		async: false,
		contentType: "application/json",
		dataType: "jsonp",
		jsonp: false,
		cache: true,
		success: function(d) {
			t = d;
		}
	});

	return t;
}

function makeDataForCreate(patientId, medicalId, firstName, lastName, lastInteraction)
{
	var data = {};
	//data['patientId'] = patientId;
	data['medicalId'] = medicalId;
	data['firstName'] = firstName;
	data['lastName'] = lastName;
	//data['lastInteraction'] = lastInteraction;

	return data;
}

var testData = makeDataForCreate('4cf0c9b4-6ab2-11e4-b116-123b93f75cba', '234123', 'Test', 'Name', 'idk');

console.log(testData);
var x = apiCreatePatient(testData);
console.log(x);


