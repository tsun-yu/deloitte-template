<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { computed, toRefs } from 'vue';

const props = defineProps({
  bgColor: {
    type: String,
    default: '#fff'
  },
  activeColor: {
    type: String,
    default: 'var(--color-blue4)'
  },
  completeColor: {
    type: String,
    default: 'var(--color-green5)'
  },
  latesStep: {
    type: String,
    default: ''
  },
  status: {
    type: Object
  },
  /* example of progressSteps
    [
        { 
            title: 'Step 1', 
            subtitle: '更新日期:2023-03-16 14:50:45',
            status: 'status1'
        },
    ]
    */
  progressSteps: {
    type: Array,
    default: () => []
  },
  paddingInline: {
    type: String,
    default: '1.25rem'
  }
});

const { progressSteps, latesStep, status } = toRefs(props);

const currntStep = defineModel('currntStep', {
  type: String
});

const scaleDown = ref(false);

const activeIndex = computed(() => {
  return progressSteps.value.findIndex((step) => step.status === latesStep.value);
});

const currStepHandler = (step) => {
  if (step === currntStep.value) return;
  if (step === latesStep.value) {
    currntStep.value = step;
    return;
  }
  if (status.value[step] === 'inactive') return;

  currntStep.value = step;
};
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
      scaleDown.value = true;
      return;
    }
    scaleDown.value = false;
  });
});
</script>

<template>
  <div class="progress" :class="{ 'progress--scaleDown': scaleDown }">
    <div
      class="progress__item"
      :class="{
        'progress__item--active': idx === activeIndex,
        'progress__item--completed': idx < activeIndex
      }"
      v-for="(step, idx) of progressSteps"
      :key="'progressSteps' + idx"
      @click="currStepHandler(step.status)"
    >
      <div class="progress__stepWrap">
        <div
          class="progress__step"
          :class="{
            'progress__step--active': idx === activeIndex,
            'progress__step--completed': idx < activeIndex
          }"
        >
          <v-icon v-show="idx < activeIndex" name="bi-check-all" scale="1.5" />
          <v-icon v-show="idx > activeIndex" :name="'ri-number-' + (idx + 1)" scale="1" />
        </div>
        <div class="progress__stepLine"></div>
        <div class="progress__stepLine--active"></div>
      </div>
      <p class="progress__subtitle">STEP {{ idx + 1 }}</p>
      <h4 class="progress__title">{{ step.title }}</h4>
      <p v-if="step.subtitle" class="progress__subtitle">
        {{ step.subtitle }}
      </p>
      <p v-else class="progress__subtitle">
        {{ idx === activeIndex ? 'In Progress' : idx < activeIndex ? 'Completed' : 'Pending' }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  padding: 1.5rem 0.625rem;
  border-radius: 1rem;
  background-color: v-bind(bgColor);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 20px #0000001c;
  transition: 0.3s ease-in-out;
  height: 11.375rem;

  &:hover {
    transform: scale(1);
    border-radius: 1rem;
    backdrop-filter: blur(2px);
    box-shadow: 0 10px 20px #0000001c;

    .progress__item {
      padding-inline: v-bind(paddingInline);
      align-items: stretch;

      .progress__stepWrap {
        transform: scale(1);
        margin-bottom: 1.5rem;

        .progress__step {
          transform: scale(1);

          &.progress__step--active {
            animation: pulse 2s linear infinite;

            & ~ .progress__stepLine--active {
              display: block;
            }
          }
        }

        .progress__stepLine {
          display: block;
          left: calc(2rem + v-bind(paddingInline) * 2);
          width: calc(100% - 2rem - v-bind(paddingInline) * 2);
        }
        .progress__stepLine--active {
          left: calc(2rem + v-bind(paddingInline) * 2);
          width: calc(100% - 2rem - v-bind(paddingInline) * 2);
          animation: loading 2s ease-in-out infinite;
        }
      }

      .progress__item.progress__item--active {
        flex-shrink: 1;
      }

      .progress__title,
      .progress__subtitle {
        display: block;
      }
    }
  }
  &--scaleDown {
    position: sticky;
    top: 3.5rem;
    z-index: 1000;
    border-radius: 10rem;
    transform: scale(0.25);
    /* box-shadow:
      0 10px 50px rgba(0, 0, 0, 0.17),
      0 12px 10px rgb(0 0 0 / 10%),
      0 2px 5px rgb(0 0 0 / 10%); */
    box-shadow:
      20px 92px 60px -20px rgba(0, 0, 0, 0.25),
      0 8px 28px rgba(0, 0, 0, 0.1);
    background-color: #ffffffa3;
    backdrop-filter: blur(8px);

    .progress__item {
      padding-inline: 0;
      align-items: center;

      .progress__stepWrap {
        margin-bottom: 0;

        .progress__step {
          transform: scale(2.5);

          &.progress__step--active {
            & ~ .progress__stepLine--active {
              display: none;
            }
          }

          &.progress__step--active {
            animation: pulse--min 2s linear infinite;
          }
        }

        .progress__stepLine {
          display: none;
          position: absolute;
          top: 50%;
          left: 2rem;
          transform: translateY(-50%);
          width: calc(100% - 2rem);
          height: 4px;
          border-radius: 2px;
          background-color: var(--color-blue1);
          background-color: #eee;
        }
      }

      .progress__title,
      .progress__subtitle {
        display: none;
      }
    }
  }
  &__item {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    padding-inline: v-bind(paddingInline);
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      flex-shrink: 0 !important;
    }
    &.progress__item--active {
      flex-shrink: 0;
      .progress__title {
        color: #333;
      }
      .progress__subtitle:last-child {
        color: v-bind(activeColor);
        background-color: #0076a81c;
      }
    }

    &.progress__item--completed {
      .progress__title {
        color: #333;
      }
      .progress__subtitle:last-child {
        color: v-bind(completeColor);
        background-color: #ebfbf2;
      }
    }

    &:last-child {
      .progress__stepLine,
      .progress__stepLine--active {
        display: none !important;
      }
    }

    .progress__stepWrap {
      position: relative;
      margin-bottom: 1.5rem;

      .progress__step {
        display: grid;
        place-items: center;
        width: 2rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: var(--color-blue1);
        background-color: #eee;
        color: var(--color-blue2);
        color: var(--color-gray6);
        transition: 0.3s ease-in-out;

        &.progress__step--active {
          background-color: v-bind(activeColor);
          width: 2rem;
          position: relative;
          animation: pulse 2s linear infinite;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1.75rem;
            height: 1.75rem;
            background-color: var(--color-teal1);
            border-radius: 50%;
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1.375rem;
            height: 1.375rem;
            background-color: v-bind(activeColor);
            border-radius: 50%;
          }

          & ~ .progress__stepLine--active {
            display: block;
          }
        }
        &.progress__step--completed {
          color: #fff;
          background-color: v-bind(completeColor);

          & + .progress__stepLine {
            background-color: v-bind(completeColor);
          }
        }
      }

      .progress__stepLine {
        position: absolute;
        top: 50%;
        left: calc(2rem + v-bind(paddingInline) * 2);
        width: calc(100% - 2rem - v-bind(paddingInline) * 2);
        transform: translateY(-50%);
        height: 4px;
        border-radius: 2px;
        background-color: var(--color-blue1);
        background-color: #eee;
      }

      .progress__stepLine--active {
        display: none;
        position: absolute;
        top: 50%;
        left: calc(2rem + v-bind(paddingInline) * 2);
        width: calc((100% - 2rem - v-bind(paddingInline) * 2) / 2);
        transform: translateY(-50%);
        height: 4px;
        border-radius: 2px;
        background-color: v-bind(activeColor);
        animation: loading 2s ease-in-out infinite;
      }
    }

    .progress__title,
    .progress__subtitle {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 0.75rem;
      color: var(--color-gray6);
    }

    .progress__title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-teal7);
      color: var(--color-gray6);
      margin: 0.5rem 0;
    }

    p.progress__subtitle {
      font-weight: 700;
      max-width: fit-content;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      background-color: #eee;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes pulse--min {
  0% {
    transform: scale(2.5);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(2.5);
  }
}
@keyframes loading {
  0% {
    width: 0;
  }
  100% {
    width: calc((100% - 2rem - v-bind(paddingInline) * 2) / 2);
  }
}
/* @keyframes loading--min {
  0% {
    width: 0;
  }
  100% {
    width: calc((100% - 2rem) / 2);
  }
} */
</style>
