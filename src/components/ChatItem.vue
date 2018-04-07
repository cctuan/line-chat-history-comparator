<template>
  <p class="message" :class="className" :style="messageStyles">
    {{message.content}}
    <span class="time">{{hourMins}}</span>
  </p>
</template>

<script>
import {toHourMins} from '../utils/TimeUtils'
export default {
  name: 'ChatDayBlock',
  props: {
    message: {
      type: Object,
      default: () => {return {}}
    },
    totalColumns: {
      type: Number,
      default: 1
    }
  },
  computed: {
    className() {
      return this.message.isSelf ? 'message-out' : 'message-in'
    },
    position() {
      return this.message.position || 0
    },
    hourMins() {
      return toHourMins(this.message.time)
    },
    messageStyles() {
      let blockWidth = 100 / this.totalColumns
      return {
        width: `${blockWidth / 2}%`,

        marginLeft: this.message.isSelf ?
          `${(this.position) * (100 / this.totalColumns) + blockWidth / 2 - 2}%` :
          `${(this.position) * (100 / this.totalColumns) }%`
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
  position: relative;
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  font-size: 0.8em;
  text-align: left;
}

.message-out {
  background: #407FFF;
  color: white;
}

.message-in {
  background: #F1F0F0;
  color: black;
}
.time {
  position: absolute;
  bottom: -10px;
  color: black;
  right: 0px;
}
</style>
