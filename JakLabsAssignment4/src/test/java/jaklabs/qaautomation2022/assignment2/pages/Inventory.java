package jaklabs.qaautomation2022.assignment2.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Inventory extends Base {
	
	//element locator
	By productText = By.className("title");
	By addToChartBtn = By.id("add-to-cart-sauce-labs-backpack");
	By shoppingBtn = By.className("shopping_cart_link");
	
	public Inventory(ThreadLocal<WebDriver> driver, ThreadLocal<WebDriverWait> explicitWait) {
		super(driver, explicitWait);
	}
	
	public String getProductText() {
		return getText(productText);
	}
	
	public void addtochartBtn() {
		clickAndWait(addToChartBtn);
	}
	
	public void shoppingBtn() {
		clickAndWait(shoppingBtn);
	}
	
	
}
