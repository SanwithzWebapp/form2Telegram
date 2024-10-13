function onSubmit(e) {
  var message = "G-Form to Telegram\n" + e.response.getItemResponses().map(function(itemResponse) {
    return itemResponse.getItem().getTitle() + ": " + itemResponse.getResponse();
  }).join("\n");
  
  sendTelegramNotify(message);
}

// WEBAPP ช่วยหา chat ID :  https://bit.ly/sanzTelegram

function sendTelegramNotify(message) {
  var token = 'XXXXXXX'; // Telegram bot token
  var chatId = 'XXXXXXX'; // Telegram chat ID

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      'chat_id': chatId,
      'text': message,
      'parse_mode': 'Markdown'
    })
  };
  
  UrlFetchApp.fetch(`https://api.telegram.org/bot${token}/sendMessage`, options);
}
