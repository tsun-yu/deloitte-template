<script setup>
import { ref, onBeforeUnmount, onMounted } from "vue";
import { VueSpinner } from "vue3-spinners";
const { msg, hasDotAnimation } = defineProps({
  msg: {
    type: String,
    default: "處理中...",
  },
  modalColor: {
    type: String,
    default: "#fff",
  },
  spinnerColor: {
    type: String,
    default: "var(--color-teal6)",
  },
  fontColor: {
    type: String,
    default: "#545454",
  },
  hasDotAnimation: {
    type: Boolean,
    default: true,
  },
  showLoading: {
    type: Boolean,
    default: true,
  },
});

const msgShow = ref(msg);
const msgLength = msg.length;
let typing;
const dotAnimation = () => {
  let index = 0;
  return setInterval(() => {
    msgShow.value =
      msg.slice(0, msgLength - 3) +
      msg.slice(msgLength - 3, msgLength - 3 + index);
    console.log(msgShow.value);
    index++;
    if (index === 4) {
      index = 0;
    }
  }, 300);
};

onMounted(() => {
  typing = hasDotAnimation ? dotAnimation() : null;
});

onBeforeUnmount(() => {
  clearInterval(typing);
});
</script>

<template>
  <div class="loading">
    <div class="loading__modal">
      <div class="loading__loader">
        <VueSpinner size="50" :color="spinnerColor" />
      </div>
      <p class="loading__desc">{{ msgShow }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes modalShow {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  45% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: grid;
  place-content: center;

  .loading__modal {
    background-color: v-bind(modalColor);
    width: min(85vw, 20rem);
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    padding: 1rem 1rem 1rem 2rem;
    gap: 2rem;
    box-shadow:
      0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132),
      0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108);
    animation: modalShow 0.3s;

    .loading__loader {
      flex-shrink: 0;
    }

    .loading__desc {
      font-size: 1.25rem;
      color: v-bind(fontColor);
      font-weight: 700;
      flex: 1;
    }
  }
}
</style>
