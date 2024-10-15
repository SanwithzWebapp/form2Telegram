const token = 'XXXXXXXXXX';
const chatId = 'XXXXXXXXXX';

function onSubmit(e) {
  const message = "G-Form to Telegram\n" + e.response.getItemResponses().map(item => {
    const response = Array.isArray(item.getResponse())
      ? item.getResponse().map(fileId => `https://drive.google.com/file/d/${fileId}/view`).join("\n")
      : item.getResponse();
    return `${item.getItem().getTitle()}: ${response}`;
  }).join("\n");

  sendTelegramNotify(message);
}

function sendTelegramNotify(message) {
  UrlFetchApp.fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
  });
}
