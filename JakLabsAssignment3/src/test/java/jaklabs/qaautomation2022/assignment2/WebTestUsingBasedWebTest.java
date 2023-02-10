package jaklabs.qaautomation2022.assignment2;



import org.testng.annotations.Test;

import jaklabs.qaautomation2022.assignment2.pages.BodyEmail;
import jaklabs.qaautomation2022.assignment2.pages.CommonPage;
import jaklabs.qaautomation2022.assignment2.pages.HomePage;


public class WebTestUsingBasedWebTest extends BasedWebTest {
	
	HomePage homePage = new HomePage(driver, explicitWait);
	CommonPage commonPage = new CommonPage(driver, explicitWait);
	BodyEmail bodyEmail = new BodyEmail(driver, explicitWait);
	
	String email = "automationtest";
	
	
	@Test
 	public void testSwitchIframe() {
		homePage.inputEmail(email);
		homePage.searchBtn();
		commonPage.switchIframe();
		String getEmail = bodyEmail.getBodyEmail();		
		System.out.println(getEmail);
	}
	
}
