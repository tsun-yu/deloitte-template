<script setup>
import { computed } from 'vue';

const { status, progressSteps } = defineProps({
  bgColor: {
    type: String,
    default: 'var(--color-teal1)'
  },
  activeColor: {
    type: String,
    default: 'var(--color-blue4)'
  },
  completeColor: {
    type: String,
    default: 'var(--color-green5)'
  },
  status: {
    type: String,
    default: ''
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
  }
});

const activeIndex = computed(() => {
  return progressSteps.findIndex((step) => step.status === status);
});
</script>

<template>
  <div class="progress">
    <div
      class="progress__item"
      :class="{
        'progress__item--active': idx === activeIndex,
        'progress__item--completed': idx < activeIndex
      }"
      v-for="(step, idx) of progressSteps"
      :key="'progressSteps' + idx"
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

  &:hover {
    .progress__item.progress__item--active {
      flex-shrink: 1;
    }
  }

  .progress__item {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    padding-inline: 1.25rem;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      flex-shrink: 0 !important;
    }
    &.progress__item--active {
      flex-shrink: 0;

      .progress__subtitle:last-child {
        color: v-bind(activeColor);
      }
    }

    &.progress__item--completed {
      .progress__subtitle:last-child {
        color: v-bind(completeColor);
      }
    }

    &:last-child {
      .progress__stepLine {
        display: none;
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
        color: var(--color-blue2);

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
        left: 4.5rem;
        transform: translateY(-50%);
        width: calc(100% - 4.5rem);
        height: 4px;
        border-radius: 2px;
        background-color: var(--color-blue1);
      }

      .progress__stepLine--active {
        display: none;
        position: absolute;
        top: 50%;
        left: 4.5rem;
        transform: translateY(-50%);
        width: calc((100% - 4.5rem) / 2);
        height: 4px;
        border-radius: 2px;
        background-color: v-bind(activeColor);
        animation: loading 2s ease-in-out infinite;
      }
    }

    .progress__title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-teal7);
      margin: 0.5rem 0 0.25rem;
    }

    .progress__title,
    .progress__subtitle {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .progress__subtitle {
      font-size: 0.75rem;
      color: var(--color-gray6);

      &:last-child {
        font-weight: 700;
      }
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
@keyframes loading {
  0% {
    width: 0;
  }
  100% {
    width: calc((100% - 4.5rem) / 2);
  }
}
</style>
