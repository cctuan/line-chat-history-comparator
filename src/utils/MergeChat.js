

/*
{
  totalColumn: Number
  merged: [{
    history: [
      {
        day: Unix,
        content: [
          {
            position: Number,
          }
        ]
      }
    ]
  }],
  allChat: [
    chatObject
  ]
}
*/
/*
chatObject
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
import ChatStore from '../store/ChatStore'

// const removeChat = (chat) => {}

const isTargetNewer = (source, compare) => {
  return new Date(source) - new Date(compare) < 0
}

const isEqual = (source, compare) => {
  return (new Date(source) - new Date(compare)) == 0
}

const addPositionToHistory = (history, position) => {
  return history.map(chatHistory => {
    chatHistory.content = chatHistory.content.map(content => {
      return {...content, position: position}
    })
    return chatHistory
  })
}

const cloneObject = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (e) {
    return {}
  }
}

const mergeInDay = (_centralChatHistory, _toMergeChatHistory) => {
  let centralChatHistory = cloneObject(_centralChatHistory)
  let toMergeChatHistory = cloneObject(_toMergeChatHistory)
  let totalLength = toMergeChatHistory.length + centralChatHistory.length
  let newMergedHistory = []
  let toMergeChatIndex = 0
  let centralChatHistoryIndex = 0
  while (newMergedHistory.length < totalLength) {
    if (centralChatHistory.length === centralChatHistoryIndex || !centralChatHistory[centralChatHistoryIndex]) {
      newMergedHistory.push(toMergeChatHistory[toMergeChatIndex++])
    } else if (toMergeChatHistory.length === toMergeChatIndex || !toMergeChatHistory[toMergeChatIndex]) {
      newMergedHistory.push(centralChatHistory[centralChatHistoryIndex++])
    } else if (isTargetNewer(centralChatHistory[centralChatHistoryIndex].time, toMergeChatHistory[toMergeChatIndex].time)) {
      newMergedHistory.push(centralChatHistory[centralChatHistoryIndex++])
    } else if (isEqual(centralChatHistory[centralChatHistoryIndex].time, toMergeChatHistory[toMergeChatIndex].time)) {
      toMergeChatHistory[toMergeChatIndex].content = mergeInDay(centralChatHistory[centralChatHistoryIndex].content, toMergeChatHistory[toMergeChatIndex].content)
      newMergedHistory.push(toMergeChatHistory[toMergeChatIndex++])
      centralChatHistoryIndex++
    } else {
      newMergedHistory.push(toMergeChatHistory[toMergeChatIndex++])
    }
  }
  return newMergedHistory.filter(item => !!item)
}

const addChat = (chat) => {
  const chatName = chat.info.name
  let existingChat = ChatStore.allChat.find(chatObject => chatObject.info.name === chatName)
  if (existingChat) {
    // shoud remove and re-append
    return
  }
  let chatStoreAllChatIndex = ChatStore.allChat.length
  chat.history = addPositionToHistory(chat.history, chatStoreAllChatIndex)
  if (ChatStore.merged.length === 0) {
    ChatStore.merged.push(...chat.history)
  } else {
    ChatStore.merged = mergeInDay(ChatStore.merged, chat.history, chatStoreAllChatIndex)
  }

  ChatStore.allChat.push(chat)
  ChatStore.totalColumn += 1
}

export default (chats) => {
  if (chats.length) {
    chats.forEach(addChat)
  } else {
    addChat(chats)
  }
  console.log(ChatStore)
}
