package qaautomation.december2022.api;



import org.testng.annotations.Test;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.response.Response;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import static io.restassured.RestAssured.given;
import static org.testng.Assert.assertEquals;

public class APITest extends BaseAPI {
	
	String token;
	RequestSpecification commonJsonSpec = new RequestSpecBuilder().setBaseUri(baseUrl).setContentType(ContentType.JSON)
			.build().log().all();
	RequestSpecification loginJsonSpec;

	@Test
	public void signUp() {
		String payload = "{\r\n" + "   	 \"user\":{\r\n" + "      \"first_name\":\"" + getFirstName() + "\"" + ","
				+ "      \"last_name\":\"" + getLastName() + "\"" + "," + "      \"email\":\"" + getEmail() + "\"" + ","
				+ "      \"password\":\"+62-" + getPassword() + "\"" + "," + "      \"user_type\":\"User\",\r\n"
				+ "      \"currency_id\":2\r\n" + "   }\r\n" + "}";

		Response responseSignUp = given().spec(commonJsonSpec).body(payload).when().post("/users");
		token = responseSignUp.jsonPath().get("user.authtoken");
		System.out.println(token);
		assertEquals(responseSignUp.statusCode(), 200);

		loginJsonSpec = new RequestSpecBuilder().setBaseUri(baseUrl).setContentType(ContentType.JSON)
				.addHeader("authtoken", token).build().log().all();
	}
	
}
