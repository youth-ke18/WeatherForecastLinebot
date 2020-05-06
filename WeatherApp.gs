function doPost(e) {
  // DialogflowからWebhookで送られてきたRequestを取得
  var whRequest = JSON.parse(e.postData.contents);
  // 紐付いたIntent名を取得
  var intentName = whRequest.queryResult.intent.displayName;
  
  var weatherForecast = findWeatherForecast(intentName);

  var fulfillmentText = weatherForecast[0] + "発表\n" +
                        "今日の天気は " + weatherForecast[1] +" です。\n" + 
                        weatherForecast[5];
  
  var whResponse = {"fulfillmentText": fulfillmentText};

  return ContentService.createTextOutput(JSON.stringify(whResponse));
}

function findWeatherForecast(intentName){
  // プロジェクトのプロパティ
  var property = PropertiesService.getScriptProperties();
  
  // アクセスするスプレッドシート情報を取得
  var sheetId = property.getProperty('SHEET_ID');
  var sheetName = property.getProperty('SHEET_NAME');
  
  var spreadSheet = SpreadsheetApp.openById(sheetId);
  var sheet = spreadSheet.getSheetByName(sheetName);
  
  // スプレッドシートの最終記入列を取得
  var lastRow = sheet.getLastRow();
  // スプレッドシートの最終記入行を取得
  var lastColumn = sheet.getLastColumn();
  // Intent名の行番号
  var intentNameColumn = 1;
  
  // 天気予報の情報を配列で取得
  var weatherForecast = [];
  
  // スプレッドシートにupdateInformationを上書きする
  for(var i = 1; i <= lastRow; i++){
    if(sheet.getRange(i, intentNameColumn).getValues() == intentName){
      for(var j = 3; j <= lastColumn; j++){
        // 配列に格納
        weatherForecast.push(sheet.getRange(i, j).getValues());        
      }break; 
    }
  }
  return weatherForecast;
}