package jaklabs.qaautomation2022.assignment2.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Cart extends Base {
	
	//element locator
	By checkoutBtn = By.id("checkout");
	
	
	public Cart(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
	}
	
	public void addtochartBtn() {
		clickAndWait(checkoutBtn);
	
	}
}
