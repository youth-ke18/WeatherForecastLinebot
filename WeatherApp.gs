function doPost(e) {
  // DialogflowからWebhookで送られてきたRequestを取得
  var whRequest = JSON.parse(e.postData.contents);
  
  // 紐付いたIntent名を取得
  var intentName = whRequest.queryResult.outputContexts.name;
  
  var weatherForecast = findWeatherForecast(intentName);
  
  var whResponse = {"fulfillmentText": weatherForecast,
                    "source": "example.com",
                    "payload":{
                      "line": {
                        "text": "晴れかな？"
                      }
                    }
                   };
  
  console.log(JSON.stringify(whResponse));
  return ContentService.createTextOutput(JSON.stringify(whResponse));
}

function findWeatherForecast(intentName){
  // プロジェクトのプロパティ
  var property = PropertiesService.getScriptProperties();
  
  // アクセスするスプレッドシート情報を取得
  var sheetId = property.getProperty('SHEET_ID');
  var sheetName = property.getProperty('SHEET_NAME');
  
  var ss = SpreadsheetApp.openById(sheetId);
  var sh = ss.getSheetByName(sheetName);
  
  

}


