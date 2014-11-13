$('#submitCreate').on('click', function() {
	var medicalId = document.getElementById('patientMedNumber').value;
	var firstName = document.getElementById('patientFirstName').value;
	var lastName = document.getElementById('patientLastName').value;

	var data = makeDataForCreate(medicalId, firstName, lastName);

	var user = apiCreatePatient(data);
	if (!user)
	{
		alert("Create Patient Failed");
	}
	else
	{
		alert("Success!");
	}
});
