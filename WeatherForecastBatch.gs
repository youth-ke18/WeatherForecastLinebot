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
  var publicTime = response.publicTime;
  // 今日の天気
  var todayTelop = response.forecasts[0].telop;
  // 今日の最低気温
  var todayTemperatureMin = null;
  // 基本的にnullで最低気温が表示されるときだけ更新する
  if(response.forecasts[0].temperature.min != null){
    todayTemperatureMin = response.forecasts[0].temperature.min.celsius + "℃";
  }
  //今日の最高気温
  var todayTemperatureMax = response.forecasts[0].temperature.max.celsius + "℃";
  //今日の天気（画像）
  var todayWeatherImage = response.forecasts[0].image.url;
  //天気概況文
  var textInfomation = response.description.text;
  
  var updateInformation = [cityId, publicTime, todayTelop, todayTemperatureMin, todayTemperatureMax, todayWeatherImage];
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
  for(var row = 1; row <= lastRow; row++){
    if(sheet.getRange(row, cityIdColumn) == updateInformation[0]){
      Logger.log(sheet.getRange(row, cityIdColumn));
      for(var column = 3; i <= lastColumn; j++){
        Logger.log(updateInformation[column - 2]);
        sheet.getRange(row, column).setValue(updateInformation[column - 2]);
        
      }
    }
    break;  //上書きする行は１つしかないため
  }
  
  Logger.log(row);
}
