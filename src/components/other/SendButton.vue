<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  clickFunc: { type: Function },
  backgroundColor: { type: String, default: 'var(--color-blue4-1)' },
  borderRadius: { type: String, default: '5px' }
});
const button = ref(null);
const rippleTop = ref(0);
const rippleLeft = ref(0);
const rippleScale = ref(0);
const rippleOpacity = ref(0);

onMounted(() => {
  button.value.addEventListener('mousedown', (e) => {
    rippleTop.value = e.offsetY + 'px';
    rippleLeft.value = e.offsetX + 'px';
    rippleOpacity.value = 1;
    rippleScale.value = 100;
  });
  button.value.addEventListener('mouseenter', () => {
    if (rippleOpacity.value) {
      rippleOpacity.value = 0;
      rippleScale.value = 0;
    }
  });
  button.value.addEventListener('mouseup', () => {
    setTimeout(() => {
      rippleOpacity.value = 0;
      rippleScale.value = 0;
    }, 300);
  });
});
</script>

<template>
  <button @click="clickFunc" ref="button">
    <span><slot></slot></span>
    <div class="ripple"></div>
  </button>
</template>

<style lang="scss" scoped>
button {
  width: clamp(20rem, 100%, 30rem);
  display: block;
  margin: auto;
  margin-top: 3rem;
  background-color: v-bind(backgroundColor);
  border: none;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 900;
  padding-block: 0.5rem;
  border-radius: v-bind(borderRadius);
  height: 2.75rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background-image: linear-gradient(#0000001a, #0000001a);
    box-shadow: 1px 1px 5px #0000004d;
    box-shadow:
      0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }

  &:active {
    /* background-image: linear-gradient(#0003, #0003); */
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    /* z-index: 1; */
  }

  &::before {
    content: '';
    position: absolute;
    top: v-bind(rippleTop);
    left: v-bind(rippleLeft);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    opacity: v-bind(rippleOpacity);
    background-color: #0003;
    transform: scale(v-bind(rippleScale));
    transition: transform 0.3s ease-in;
  }
}
</style>
