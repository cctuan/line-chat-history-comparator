/**
{
  info: {
    saved: Unix,
    name: String
  },
  history:[
    {
      type: 'chat', 'note'
      day: Unix,
      content: [{
        time: Unix,
        source: String,
        content: String
      }]
    }
  ]
}
*/

const regexNameOfChat = RegExp(/\[LINE\] 與(.*)的聊天記錄/)
const regexDayOfChat = RegExp(/^(\d{4}\/\d{2}\/\d{2})（[一ㄧ二二三三四四五五六六日日]）/)
const regexChat = RegExp(/^(上午|下午)(\d{2}:\d{2})\t(.+)\t(.*)/)

const parseSavedTime = line => new Date(line.substring('儲存日期： '))

const parseChatHeader = txt => {
  const chatInfo = {}
  txt.split(/\r?\n/).forEach(line => {
    let findName = regexNameOfChat.exec(line)
    if (findName && findName[0]) {
      chatInfo.name = findName[1]
      return
    }
    if (line.indexOf('儲存日期') === 0) {
      chatInfo.saved = parseSavedTime(line)
      return
    }
  })
  return chatInfo
}

const parseChatContent = (chatContentRegex, baseTime, author) => {
  let [, dayperiod, time, source, content] = chatContentRegex
  let unixTime = new Date(baseTime + ' ' + time + ' GMT+0800 (CST)')
  if (dayperiod === '下午') {
    unixTime.setTime(unixTime.getTime() + 12 * 60 * 60 * 1000)
  }
  return {
    time: unixTime,
    source,
    isSelf: source !== author,
    content
  }
}

const parseDayChat = (content, baseTime, author) => {
  return content.split(/\r\n/).map(line => {
    //return line
    let findChat = regexChat.exec(line)
    if (findChat && findChat.length) {
      return parseChatContent(findChat, baseTime, author)
    } else {
      return null
    }
  }).filter(line => line)
}

const parseLines = (txt) => {
  const chats = {}
  let chatBlocks = txt.split(/\d{4}\/\d{2}\/\d{2}（[一ㄧ二二三三四四五五六六日日]）/)
  if (!chatBlocks.length) {
    return
  }
  chats.info = parseChatHeader(chatBlocks.shift())

  // temporarily solution
  const dayTitles = txt.split(/\r?\n/).map(line => {
    let findDay = regexDayOfChat.exec(line)
    if (findDay && findDay.length) {
      return findDay[1]
    }
    return false
  }).filter(line => line)

  chats.history = dayTitles.map((day, dayIndex) => {
    return {
      type: 'chat',
      time: day,
      //content: chatBlocks[dayIndex]
      content: parseDayChat(chatBlocks[dayIndex], day, chats.info.name)
    }
  })

  return chats
}

const ChatParser = (txt) => {
  return parseLines(txt)
}

export default ChatParser
