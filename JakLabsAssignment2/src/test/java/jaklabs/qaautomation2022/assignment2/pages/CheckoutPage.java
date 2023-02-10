package jaklabs.qaautomation2022.assignment2.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CheckoutPage extends BasePage {
	
	//element locator
	By firstName = By.id("first-name");
	By lastName = By.id("last-name");
	By postalCode = By.id("postal-code");
	By continueBtn = By.id("continue");
	By finishBtn = By.id("finish");
	By completeText = By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[2]/h2[1]");
	
	public CheckoutPage(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
		
	}
		
	public void inputFirstName(String firstNameInput) {
		setText(firstName, firstNameInput);
	}
		
	public void inputLastName(String lastNameInput) {
		setText(lastName, lastNameInput);
	}
		
	public void inputPostalCode(String postalCodeInput) {
		setText(postalCode, postalCodeInput);
	}
	
	public void continueBtn() {
		clickAndWait(continueBtn);
	}
	
	public void finishBtn() {
		clickAndWait(finishBtn);
	}
	
	public String getCompleteText() {
		return getText(completeText);
	}
	
		
	
} 
