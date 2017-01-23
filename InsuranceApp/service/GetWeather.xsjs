function execute() {
	var destination_package = "InsuranceApp.service";

	var destination_name = "weather";

	try {

		var dest = $.net.http.readDestination(destination_package, destination_name);

		var client = new $.net.http.Client();

		var req = new $.web.WebRequest($.net.http.GET, "?lat=12.9716&lon=77.5946&appid=157b65a5f9cbd1be278e72b19cbbaa0e");

		client.request(req, dest);

		var response = client.getResponse();

		var weatherdata = response.body.asString();

		var data = JSON.parse(weatherdata);

		var humidity = data.main.humidity.toString();
		var pressure = data.main.pressure.toString();
		var temp = data.main.temp.toString();
		var temp_max = data.main.temp_max.toString();
		var temp_min = data.main.temp_min.toString();
		var conditionA = data.weather[0].main.toString();
		var conditionB = data.weather[0].main.toString();
		var cityName = data.name.toString();
		var lat = data.coord.lat.toString();
		var long = data.coord.lon.toString();
		var conn = $.db.getConnection();
		var query = 'call \"INSURANCEAPP"."InsuranceApp.procedure::InsertWeather\"(?,?,?,?,?,?,?,?,?,?)';
		var myStatement = conn.prepareCall(query);
		myStatement.setString(1, cityName);
		myStatement.setString(2, humidity);
		myStatement.setString(3, pressure);
		myStatement.setString(4, temp);
		myStatement.setString(5, temp_max);
		myStatement.setString(6, temp_min);
		myStatement.setString(7, conditionA);
		myStatement.setString(8, conditionB);
		myStatement.setString(9, lat);
		myStatement.setString(10, long);
		var rs = myStatement.execute();
		conn.commit();

// 		$.response.contentType = "application/json";

// 		$.response.setBody(response.body.asString());

// 		$.response.status = $.net.http.OK;

	} catch (e) {

// 		$.response.contentType = "text/plain";

// 		$.response.setBody(e.message);

	}
}