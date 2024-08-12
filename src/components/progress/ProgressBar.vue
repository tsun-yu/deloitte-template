<script setup>
import { computed } from 'vue';

const { status, progressSteps } = defineProps({
  bgColor: {
    type: String,
    default: 'var(--color-teal1)'
  },
  activeColor: {
    type: String,
    default: 'var(--color-teal2)'
  },
  progressColor: {
    type: String,
    default: '#c1dedc'
  },
  activeFontColor: {
    type: String,
    default: 'var(--color-teal7)'
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

const activeIndx = computed(() => {
  return progressSteps.findIndex((step) => step.status === status);
});
</script>

<template>
  <div class="progress">
    <div class="progress__wrap">
      <div
        class="progress__step"
        :class="{
          'progress__step--active': idx === activeIndx,
          'progress__step--completed': idx <= activeIndx
        }"
        v-for="(step, idx) of progressSteps"
        :key="'progressSteps' + idx"
      >
        <h4 class="progress__title">{{ step.title }}</h4>
        <p v-if="step.subtitle" class="progress__subtitle">
          {{ step.subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  padding: 0.625rem;
  border-radius: 1rem;
  background-color: v-bind(bgColor);

  .progress__wrap {
    display: flex;
    gap: 0.25rem;
    overflow: hidden;
    border-radius: 0.625rem;

    &:hover {
      .progress__step.progress__step--active {
        flex-shrink: 1;
      }
    }

    .progress__step {
      position: relative;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-color: v-bind(progressColor);
      color: var(--color-teal6);
      min-height: 4rem;
      min-width: 0;
      padding-inline: 1.25rem;
      transition: 0.3s ease-in-out;
      cursor: default;

      &:hover {
        flex-shrink: 0 !important;
      }

      &:not(:first-child):before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border-top: 2rem solid transparent;
        border-bottom: 2rem solid transparent;
        border-right: 1rem solid transparent;
        border-left: 1rem solid v-bind(bgColor);
      }

      &:not(:last-child):after {
        content: '';
        position: absolute;
        z-index: 2;
        top: 0;
        right: -2rem;
        border-top: 2rem solid transparent;
        border-bottom: 2rem solid transparent;
        border-right: 1rem solid transparent;
        border-left: 1rem solid v-bind(progressColor);
      }

      &.progress__step--completed {
        background-color: v-bind(activeColor);
        color: v-bind(activeFontColor);

        &::after {
          border-left-color: v-bind(activeColor);
        }
      }

      &.progress__step--active {
        flex-shrink: 0;
      }

      .progress__title,
      .progress__subtitle {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .progress__subtitle {
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
    }
  }
}
</style>
