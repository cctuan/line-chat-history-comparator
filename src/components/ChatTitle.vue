<template>
  <div class="chat-title" :style="containerStyles">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'ChatTitle',
  components: {
  },
  props: {
    title: {
      type: String,
    },
    totalColumns: {
      type: Number,
      default: 1
    }
  },
  computed: {
    containerStyles() {
      return {
        width: `${100 / this.totalColumns}%`
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-title {
  float: left
}
</style>
