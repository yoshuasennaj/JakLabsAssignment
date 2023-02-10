package jaklabs.qaautomation2022.assignment2.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage extends BasePage {

	//element locator
	By searchInput = By.className("ycptinput");
	By searchBtn = By.xpath("/html[1]/body[1]/div[1]/div[2]/"
			+ "main[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/div[1]/div[4]/button[1]/i[1]");
	
	
	public HomePage(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
	}
	
	public void inputEmail(String emailInput) {
		setText(searchInput, emailInput);
	}
	
	
	public void searchBtn() {
		clickAndWait(searchBtn);
	}
	
}
