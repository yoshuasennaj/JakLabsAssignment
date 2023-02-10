package jaklabs.qaautomation2022.assignment2;

import org.testng.annotations.Test;

import jaklabs.qaautomation2022.assignment2.pages.Cart;
import jaklabs.qaautomation2022.assignment2.pages.Checkout;
import jaklabs.qaautomation2022.assignment2.pages.Inventory;
import jaklabs.qaautomation2022.assignment2.pages.Login;

import org.testng.Assert;
public class WebTestUsingBasedWebTest extends BasedWebTest {
	Login loginPage = new Login(driver, explicitWait);
	Inventory inventoryPage = new Inventory(driver, explicitWait);
	Cart cartPage = new Cart(driver, explicitWait);
	Checkout checkoutPage = new Checkout(driver, explicitWait);
	
	
	String username = "standard_user";
	String password = "secret_sauce";
	String firstName = "Yoshua";
	String lastName = "Senna";
	String postalCode = "63394";
	
	
	@Test
 	public void testFinishTransaction() {
		loginPage.inputUsername(username);
		loginPage.inputPassword(password);
		loginPage.loginBtn();
		inventoryPage.addtochartBtn();
		inventoryPage.shoppingBtn();
		cartPage.addtochartBtn();
		checkoutPage.inputFirstName(firstName);
		checkoutPage.inputLastName(lastName);
		checkoutPage.inputPostalCode(postalCode);
		checkoutPage.continueBtn();
		checkoutPage.finishBtn();
		checkoutPage.getCompleteText();
			
		String actualText = checkoutPage.getCompleteText();
		String expectedText = "THANK YOU FOR YOUR ORDER";
		System.out.println("actual: " + actualText);
		System.out.println("expected: " + expectedText);
		Assert.assertTrue(actualText.contains(expectedText));
		//Assert.assertEquals(actualText, expectedText); 
	}

	
	
}
