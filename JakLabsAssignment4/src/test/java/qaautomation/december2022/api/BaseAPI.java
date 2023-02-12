package qaautomation.december2022.api;

import com.github.javafaker.Faker;

public class BaseAPI {
	
	String baseUrl = "https://api-staging-builder.engineer.ai";
	Faker faker = new Faker();
	String first_name, last_name, email, password, phone_number, user_type;
	int currency_id;

	public void setFirstName(String first_name) {
		this.first_name = first_name;
	}

	public String getFirstName() {
		first_name = faker.name().firstName();
		return first_name;
	}

	public void setLastName(String last_name) {
		this.last_name = last_name;
	}

	public String getLastName() {
		last_name = faker.name().lastName();
		return last_name;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		email = faker.internet().emailAddress();
		return email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		password = faker.internet().password();
		return password;
	}

	public void setPhonenumber(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getPhonenumber() {
		return phone_number;
	}

	public void setUserType(String user_type) {
		this.user_type = user_type;
	}

	public String getUserType() {
		return user_type;
	}

	public void setCurrencyId(int currency_id) {
		this.currency_id = currency_id;
	}

	public int getCurrencyId() {
		return currency_id;
	}

	public String toJSONString() {
		return "{ User: {firstName:" + first_name + ", lastName:" + last_name + ", email:" + email + ", password:"
				+ password + ", phone_number:" + phone_number + ", user_type:" + user_type + ", currency_id:"
				+ currency_id + " }}";

	}
}
