<script setup>
import { ref, computed, watchEffect } from 'vue';

const otherOptRadio = ref('');
const otherChecked = computed(() => {
  return otherOptRadio.value === 'other';
});

defineProps({
  sectionWidth: {
    type: String,
    default: '100%'
  },
  sectionMarginTop: {
    type: String,
    default: '0'
  },
  optMaxWidth: {
    type: String,
    default: '14rem'
  },
  accentColor: {
    type: String,
    default: 'var(--color-gray9)'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  showRadio: {
    type: Boolean,
    default: false
  },
  /* example of radioOpts
['董總辦公室', '法務部', '研發部', '業務部', '財務部']
 */
  radioOpts: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  hasOther: {
    type: Boolean,
    default: false
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
    <label>
      <slot name="labelName"></slot>
    </label>
    <span class="requiredTag" v-if="!hasData && (isRequired || otherChecked)">
      <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> 必填</span
    >
    <div class="radioGroup">
      <div class="radioOpt" v-for="(v, i) of radioOpts" :key="id + i">
        <input
          v-show="showRadio"
          type="radio"
          :id="id + i"
          :name="id"
          :required="isRequired"
          :value="v"
          v-model="data"
          @change="otherOptRadio = ''"
        />
        <label :for="id + i">{{ v }}</label>
      </div>
      <div v-if="hasOther" class="radioOpt">
        <input
          v-show="showRadio"
          type="radio"
          :id="id + 'other'"
          :name="id"
          :required="isRequired"
          value="other"
          @change="data = ''"
          v-model="otherOptRadio"
        />
        <label :for="id + 'other'">其他</label>
      </div>
      <div class="otherInput" v-if="otherChecked">
        <input
          type="text"
          pattern='[^\/\\\|*?&$=%<>" ]*'
          v-model.trim="data"
          required
          :class="{ hasData }"
          placeholder="請輸入"
        />
        <p class="errStr">
          <font-awesome-icon :icon="[' fas', 'circle-exclamation']" />
          不可包含: &#92; &#47; &#42; &#63; &quot; &lt; &gt; &#124; &amp; &#36; &#61; &#37;
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formGroup {
  padding-inline: 0.25rem;
  width: v-bind(sectionWidth);
  margin-top: v-bind(sectionMarginTop);

  > label {
    line-height: 1.625rem;
    margin-right: 0.5rem;
  }

  .radioGroup {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(v-bind(optMaxWidth), 1fr));

    .radioOpt {
      display: flex;
      align-items: center;
      box-shadow: 0 0 0 1px #d1d6d4;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        box-shadow: 0 0 0 2px #d1d6d4;
      }

      &:has(input:checked) {
        box-shadow: 0 0 0 2px var(--color-deloitte);
      }

      label {
        padding: 0.75rem 0.5rem;
        line-height: 1.25rem;
        margin: 0;
        flex: 1;
        cursor: pointer;
        font-weight: 400;
      }

      input {
        cursor: pointer;
        margin-left: 0.5rem;
        accent-color: v-bind(accentColor);
      }
    }

    .otherInput {
      grid-column: 1/-1;

      input {
        font-family: 'Verdana', 'Microsoft JhengHei', sans-serif;
        display: block;
        border: none;
        box-shadow: 0 0 0 1px #d1d6d4;
        border-radius: 5px;
        font-size: 1rem;
        color: #252525;
        width: 100%;
        padding: 0.75rem 0.5rem;
        line-height: 1.25rem;

        &:hover {
          box-shadow: 0 0 0 2px #d1d6d4;
        }

        &.hasData,
        &:focus {
          outline: none;
        }

        &:focus {
          box-shadow: 0 0 0 2px var(--color-deloitte);
        }

        &:invalid {
          &.hasData {
            box-shadow: 0 0 0 2px var(--color-danger);

            & + .errStr {
              display: block;
            }
          }

          &.invalid {
            box-shadow: 0 0 0 2px var(--color-danger);
          }
        }
      }

      &:has(input.hasData) {
        ~ .requiredTag {
          display: none;
        }
      }

      .errStr {
        background-color: #f9dedc;
        padding: 0.5rem;
        border-radius: 0.5rem;
        display: none;
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
}
</style>
