function weatherForecastUpdate() {
  // 東京の天気の情報
  var jsonResponse = UrlFetchApp.fetch("http://weather.livedoor.com/forecast/webservice/json/v1?city=130010");
  // JSON→JavaScriptオブジェクトに変換
  var response = JSON.parse(jsonResponse.getContentText());
  
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
  
  
  
  Logger.log(todayTemperatureMax);
}

function spreadSheetUpdate(){
  // 天気予報の情報を溜めるスプレッドシートを取得
  var sheet = SpreadsheetApp.getActiveSheet();
  // スプレッドシートの最終記入列を取得
  var lastRow = sheet.getLastRow();
  // スプレッドシートの最終記入行を取得
  var lastColumn = sheet.getLastColumn();
  
  
  Logger.log(lastRow);
    sheet.getRange(1,1).setValue("松尾芭蕉");



}
