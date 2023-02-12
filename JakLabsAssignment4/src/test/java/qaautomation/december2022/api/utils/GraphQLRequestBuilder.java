package qaautomation.december2022.api.utils;

public class GraphQLRequestBuilder {
	public org.json.JSONObject json;
	
	public GraphQLRequestBuilder() {
		json = new org.json.JSONObject();
	}
	
	public void setQuery(String query) {
		json.put("query", query);
	}
	
	public void setVariable(String variable) {
		json.put("variables", variable);
	}
	
	public String getJSONString() {
		return json.toString();
	}
}
