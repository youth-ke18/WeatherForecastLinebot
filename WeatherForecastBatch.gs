function weatherForecastUpdate() {
  // プロジェクトのプロパティ
  var property = PropertiesService.getScriptProperties();
  
  // アクセスする場所の情報を取得
  var TOKYO = property.getProperty('TOKYO');
  
  // 東京の天気の情報（Livedoor天気予報APIを使用）
  var jsonResponse = UrlFetchApp.fetch("http://weather.livedoor.com/forecast/webservice/json/v1?city=" + TOKYO);
  // JSON→JavaScriptオブジェクトに変換
  var response = JSON.parse(jsonResponse.getContentText());
  
  // CityID
  var cityId = response.link.split("forecast/")[1];
  
  // 予報の発表日時
  var year = response.publicTime.split("-")[0] + "年";
  var month = response.publicTime.split("-")[1] + "月";
  var day = response.publicTime.split("-")[2].split("T")[0] + "日";
  var time = response.publicTime.split("T")[1].split("+")[0];
  var publicTime = year + month + day + time;
  
  // 今日の天気
  var todayTelop = response.forecasts[0].telop;
  
  // 今日の最低気温
  var todayTemperatureMin;
  // 最低気温が表示されるときだけ更新する
  if(response.forecasts[0].temperature.min != null){
    todayTemperatureMin = response.forecasts[0].temperature.min.celsius + "℃";
  }else{
    todayTemperatureMin = "---";
  }

  //今日の最高気温
  var todayTemperatureMax;
  // 最高気温が表示されるときだけ更新する
  if(response.forecasts[0].temperature.max != null){
    todayTemperatureMax = response.forecasts[0].temperature.max.celsius + "℃";
  }else{
    todayTemperatureMax = "---";
  }
  
  //今日の天気（画像）
  var todayWeatherImage = response.forecasts[0].image.url;
  
  //明日の天気
  Logger.log(response.description.text);
  var textInfomation = "明日は、" + response.description.text.split("\n\n")[3].split("日は、")[1];
  
  
  var updateInformation = [cityId, publicTime, todayTelop, todayTemperatureMin, todayTemperatureMax, todayWeatherImage, textInfomation];
 // Logger.log(updateInformation);
  spreadSheetUpdate(updateInformation);
  
}

function spreadSheetUpdate(updateInformation){
  // 天気予報の情報を溜めるスプレッドシートを取得
  var sheet = SpreadsheetApp.getActiveSheet();
  // スプレッドシートの最終記入列を取得
  var lastRow = sheet.getLastRow();
  Logger.log(lastRow);
  // スプレッドシートの最終記入行を取得
  var lastColumn = sheet.getLastColumn();
  // CityIDの行番号
  var cityIdColumn = 2;
  
  // スプレッドシートにupdateInformationを上書きする
  for(var i = 1; i <= lastRow; i++){
    Logger.log(sheet.getRange(i, cityIdColumn).getValues());
    if(sheet.getRange(i, cityIdColumn).getValues() == updateInformation[0]){
      for(var j = 3; j <= lastColumn; j++){
        Logger.log(updateInformation[j - 2]);
        sheet.getRange(i, j).setValue(updateInformation[j - 2]);        
      }break; 
    }
  }
}
