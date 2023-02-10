package jaklabs.qaautomation2022.assignment2.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BodyEmail extends BasePage {
	
	//element locator
	By bodyEmail = By.id("mail");

	
	public BodyEmail(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
	}
	
	public String getBodyEmail() {
		return getText(bodyEmail);
	}
	
	
}
