<script setup>
import { ref, computed, watchEffect } from 'vue';

defineProps({
  sectionWidth: {
    type: String,
    default: '100%'
  },
  sectionMarginTop: {
    type: String,
    default: '0'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  dropdownOpts: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const data = defineModel('data', {
  type: String
});

const hasData = computed(() => {
  return data.value !== '';
});
</script>

<template>
  <div class="formGroup">
    <div class="formGroup__input">
      <select :class="{ hasData }" :id="id" :name="id" v-model="data" :required="isRequired">
        <option v-for="(v, i) of dropdownOpts" :key="i" :value="v">
          {{ v }}
        </option>
      </select>
      <label>
        <slot name="labelName"></slot>
      </label>
    </div>
    <p class="requiredTag" v-if="isRequired">
      <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> 必填
    </p>
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  padding: 1rem 0.25rem 0;
  width: v-bind(sectionWidth);
  margin-top: v-bind(sectionMarginTop);

  .formGroup__input {
    margin-top: 0.625rem;
    position: relative;

    select {
      font-family: 'Verdana', 'Microsoft JhengHei', sans-serif;
      display: block;
      border: none;
      box-shadow: 0 0 0 1px #d1d6d4;
      border-radius: 5px;
      font-size: 1rem;
      color: #252525;
      width: 100%;
      padding: 0.75rem 0.5rem;
      height: 3rem;
      appearance: none;
      background: url(@/assets/icons/arrow-down.svg) no-repeat right 0.5rem top 50% / 1.5rem;

      &:hover {
        box-shadow: 0 0 0 2px #d1d6d4;
      }

      &.hasData,
      &:focus {
        outline: none;

        + label {
          transform: translateY(-195%);
          font-size: 0.8125rem;
          left: 0.5rem;
          padding-inline: 0.25rem;
          font-weight: 700;
        }
      }

      &:focus {
        box-shadow: 0 0 0 2px var(--color-deloitte);
        + label {
          color: var(--color-deloitte);
        }

        &.invalid {
          + label {
            color: var(--color-danger);
          }
        }
      }

      &:invalid {
        &.invalid {
          box-shadow: 0 0 0 2px var(--color-danger);
        }

        &.hasData {
          box-shadow: 0 0 0 2px var(--color-danger);

          + label {
            color: var(--color-danger);
          }
        }
      }
    }

    label {
      position: absolute;
      display: inline-block;
      font-size: 1rem;
      color: #626264;
      color: #aaa;
      left: 0.25rem;
      top: 50%;
      padding-inline: 0.25rem;
      transform: translateY(-50%);
      transition: 0.1s ease-in-out;
      background-color: #fff;
    }

    &:has(select.hasData) {
      ~ .requiredTag {
        display: none;
      }
    }

    &:has(select:invalid.hasData) {
      + .errStr {
        display: block;
      }
    }
  }

  .requiredTag {
    color: var(--color-danger);
    color: #b3261e;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
}
</style>
