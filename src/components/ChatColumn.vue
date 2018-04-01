<template>
  <div class="chat-container">
    <h4>與{{chat.info.name}}對話</h4>
    <section class="chat-column">
      <ChatDayBlock v-for="(dayMessage, index) in dayMessages" :key="index" :chatDay="dayMessage"/>
    </section>
  </div>
</template>

<script>
import ChatDayBlock from './ChatDayBlock.vue'
export default {
  name: 'ChatColumn',
  components: {
    ChatDayBlock
  },
  props: {
    chat: {
      type: Object,
      default: () => {return {}}
    }
  },
  computed: {
    dayMessages() {
      return this.chat.history
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-container {
  max-width: 350px;
  float: left;
  margin-left: 2em;
}
.chat-column {
  background: white;
  height: 50vh;
  margin-bottom: 1em;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 0 2em 0;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
}
</style>
