<template>
  <div class="chat-day-container" :style="containerStyles">
    <h5>{{dayTitle}}</h5>
    <ChatItem v-for="(message, index) in messages" :key="index" :message="message" :totalColumns="totalColumns"/>
  </div>
</template>

<script>
import ChatItem from './ChatItem.vue'
export default {
  name: 'ChatDayBlock',
  components: {
    ChatItem
  },
  props: {
    totalColumns: {
      type: Number,
    },
    chatDay: {
      type: Object,
      default: () => {return {}}
    }
  },
  computed: {
    containerStyles() {
      return {
        width: `100%`
      }
    },
    messages() {
      return this.chatDay.content
    },
    dayTitle() {
      const d = new Date(this.chatDay.time)
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
