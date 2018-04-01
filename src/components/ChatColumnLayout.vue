<template>
  <div class="chat-container" :style="containerStyles">
    <h4>與{{chat.info.name}}對話</h4>
    <section class="chat-column" :style="styles">
    </section>
  </div>
</template>

<script>
export default {
  name: 'ChatColumnLayout',
  components: {
  },
  props: {
    totalColumns: {
      type: Number,
    },
    chat: {
      type: Object,
      default: () => {return {}}
    },
    height: {
      type: Number
    }
  },
  computed: {
    containerStyles() {
      return {
        width: `${100/this.totalColumns}%`
      }
    },
    styles() {
      return {
      }
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
