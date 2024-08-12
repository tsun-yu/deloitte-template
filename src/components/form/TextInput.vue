<script setup>
import { computed } from 'vue';

defineProps({
  inputWidth: {
    type: String,
    default: '100%'
  },
  inputType: {
    type: String,
    default: 'text'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  },
  pattern: {
    type: String,
    default: '[^\\/\\\\\\|*?&$=%<>"]*'
  },
  maxlength: {
    type: Number
  },
  autocomplete: {
    type: String,
    default: 'on'
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
      <input
        ref="input"
        :type="inputType"
        :id="id"
        :required="isRequired"
        v-model.trim="data"
        :pattern="pattern"
        :class="{ hasData }"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
      />
      <label :for="id">
        <slot name="labelName"></slot>
      </label>
    </div>
    <p class="errStr">
      <v-icon name="ri-error-warning-fill" />
      <slot name="errorSting"
        >不可包含: &#92; &#47; &#42; &#63; &quot; &lt; &gt; &#124; &amp; &#36; &#61; &#37;</slot
      >
    </p>
    <p class="requiredTag" v-if="isRequired"><v-icon name="ri-error-warning-fill" /> 必填</p>
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  padding: 1rem 0.25rem 0;
  width: v-bind(inputWidth);

  .formGroup__input {
    margin-top: 0.625rem;
    position: relative;

    input {
      font-family: 'Verdana', 'Microsoft JhengHei', sans-serif;
      display: block;
      border: none;
      box-shadow: 0 0 0 1px #d1d6d4;
      border-radius: 0.25rem;
      border-radius: 5px;
      font-size: 1rem;
      color: #252525;
      width: 100%;
      padding: 0.75rem 0.5rem;
      line-height: 1.5rem;

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

    &:has(input.hasData) {
      ~ .requiredTag {
        display: none;
      }
    }

    &:has(input:invalid.hasData) {
      + .errStr {
        display: block;
      }
    }
  }

  .requiredTag,
  .errStr {
    color: var(--color-danger);
    color: #b3261e;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .errStr {
    background-color: #f9dedc;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: none;
  }
}
</style>
