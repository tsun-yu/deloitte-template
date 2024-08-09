<script setup>
import { ref, computed, watchEffect, watch } from "vue";

const otherChecked = ref(false);

defineProps({
  id: {
    type: String,
    required: true,
  },
  trueValue: {
    default: true,
  },
  falseValue: {
    default: false,
  },
});

const data = defineModel("data");
</script>

<template>
  <div class="switch">
    <input
      type="checkbox"
      :id="id"
      :name="id"
      v-model="data"
      :true-value="trueValue"
      :false-value="falseValue"
    />
    <label :for="id"> </label>
  </div>
</template>

<style lang="scss" scoped>
.switch {
  padding-block: 0.125rem;

  input {
    display: none;

    &:checked {
      + label {
        background-color: var(--color-teal7);
        background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));

        &::after {
          background-color: var(--color-teal1);
          transform: translateX(1.25rem) translateY(-50%) scale(0.9);
        }
      }
    }
  }

  label {
    display: block;
    width: 2.75rem;
    height: 1.5rem;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 0 0 0 2px var(--color-teal7);
    position: relative;
    background-image: linear-gradient(rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07));

    &::after {
      content: "";
      display: block;
      height: 100%;
      aspect-ratio: 1;
      background-color: var(--color-teal7);
      border-radius: 50%;
      position: absolute;
      transition: 0.3s ease-in-out;
      top: 50%;
      transform: translateY(-50%) scale(0.7);
    }
  }
}
</style>
