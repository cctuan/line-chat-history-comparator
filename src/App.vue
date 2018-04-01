<template>
  <div id="app">
    <div>
      <input type="file" id="input" @change="onFileChane" multiple/>
    </div>
    <div class="title-container">
    <!--<ChatColumnLayout v-for="(chat, index) in allChat" :key="`chat-layout-${index}`" :chat="chat" :totalColumns="totalColumns"/>-->
      <ChatTitle  v-for="(chat, index) in allChat" :key="`chat-title-${index}`" :title="chat.info.name" :totalColumns="totalColumns"/>
      <div class="clean"/>
    </div>
    <template>
      <ChatDayBlock v-for="(chat, index) in mergedChats" :key="`chat-item-${index}`" :chatDay="chat" :totalColumns="totalColumns"/>
    </template>
  </div>
</template>

<script>
import ChatTitle from './components/ChatTitle.vue'
import ChatColumnLayout from './components/ChatColumnLayout.vue'
import ChatDayBlock from './components/ChatDayBlock.vue'
import ChatStore from './store/ChatStore'
// import Events from './utils/Events'
import MergeChat from './utils/MergeChat'
import ChatParser from './utils/ChatParser'

export default {
  name: 'app',
  components: {
    ChatColumnLayout,
    //ChatColumn,
    ChatDayBlock,
    ChatTitle
  },
  data() {
    return {
      chats: ChatStore
    }
  },
  computed: {
    allChat() {
      return this.chats.allChat || []
    },
    totalColumns() {
      return this.chats.totalColumn || 0
    },
    mergedChats() {
      return this.chats.merged || []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadExternal()
    })
  },
  methods: {
    loadExternal: async function() {
    },
    onFileChane(evt) {
      let files = evt.target.files

      Array.from(files).forEach(file => {
        let reader = new FileReader()
        reader.onload = (f) => {
          let json = ChatParser(f.target.result)
          MergeChat(json)
        }
        reader.readAsText(file)
      })
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title-container {
  position: fixed;
  top: 0;
  width: 100%;
}
.clean {
  clear: both;
}
</style>
