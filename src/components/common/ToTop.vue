<script setup>
import { onMounted, ref } from "vue";
const { mainContent, mainContentWrap } = defineProps({
  bgColor: {
    type: String,
    default: "var(--color-teal1)",
  },
  progressBarColor: {
    type: String,
    default: "var(--color-teal6)",
  },
  progressColor: {
    type: String,
    default: "var(--color-teal2)",
  },
  mainContentWrap: {
    type: Object,
    default: null,
  },
  mainContent: {
    type: Object,
    default: null,
  },
});

const deg = ref("0deg");

const toTop = () => {
  mainContent.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  mainContent.addEventListener("scroll", () => {
    let scrollDistance = mainContent.scrollTop;
    let mainContentWrapHeight = mainContentWrap.clientHeight;
    let mainContentHeight = mainContent.clientHeight;
    let canScroll = mainContentWrapHeight - mainContentHeight;

    deg.value = (360 * scrollDistance) / canScroll + "deg";
  });
});
</script>

<template>
  <div class="toTop" @click="toTop">
    <div class="toTop__bar">
      <div class="toTop__inside">
        <v-icon
          name="ri-mouse-fill"
          scale="1.5"
          :fill="progressBarColor"
          animation="float"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toTop {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  background-color: v-bind(bgColor);
  border-radius: 50%;
  box-shadow: 0px 8px 10px #2525255c;

  cursor: pointer;
  width: 4rem;
  height: 4rem;
  display: grid;
  place-content: center;

  .toTop__bar {
    border-radius: 50%;
    width: 3.75rem;
    height: 3.75rem;
    background-image: conic-gradient(
      v-bind(progressBarColor) v-bind(deg),
      v-bind(progressColor) v-bind(deg)
    );
    display: grid;
    place-content: center;

    .toTop__inside {
      background-color: v-bind(bgColor);
      width: 3.25rem;
      height: 3.25rem;
      border-radius: 50%;
      display: grid;
      place-content: center;
    }
  }
}
</style>
