package jaklabs.qaautomation2022.assignment2.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage extends BasePage {

	//element locator
	By username = By.id("user-name");
	By password = By.id("password");
	By loginBtn = By.id("login-button");
	By failedLoginText = By.xpath("/html[1]/body[1]/div[1]/"
			+ "div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/div[3]/h3[1]");
	
	public LoginPage(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
	}
	
	public void inputUsername(String usernameInput) {
		setText(username, usernameInput);
	}
	
	public void inputPassword(String passwordInput) {
		setText(password, passwordInput);
	}
	
	public void loginBtn() {
		clickAndWait(loginBtn);
	}
	
}
