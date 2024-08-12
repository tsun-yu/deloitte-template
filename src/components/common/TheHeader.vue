<script setup>
// const isExpanded = defineModel('isExpanded', {
//   type: Boolean
// });

defineProps({
  backgroundColor: {
    type: String,
    default: '#252525'
  },
  /* example of userDropdownLinks
    [
        { 
            title: 'User Manual', 
            href: '#', 
            icon: ['fas', 'fa-book-open'] 
        },
    ]
    */
  userDropdownLinks: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <header>
    <div class="header__logo header__logo--en">
      <img src="../../assets/logo/logo-en.png" alt="" />
    </div>
    <div class="header__title">
      <p>
        <slot name="system"></slot>
      </p>
    </div>
    <div class="user">
      <div class="user__icon">
        <v-icon name="bi-person-circle" scale="1.5" />
      </div>
      <div class="user__dropdown">
        <div>
          <div>
            <h2>Hi! <slot name="userName"></slot></h2>
          </div>
          <div class="user__links" v-if="!!userDropdownLinks.length">
            <p v-for="(link, idx) of userDropdownLinks" :key="idx">
              <a :href="link.href"
                ><font-awesome-icon :icon="[...link.icon]" v-if="link.icon" /> {{ link.title }}</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="header__logo header__logo--cn">
      <img src="../../assets/logo/logo-cn.png" alt="" />
    </div>
  </header>
  <nav></nav>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  background-color: v-bind(backgroundColor);
  height: 4rem;
  padding-inline: 1rem;
  position: sticky;
  top: 0;

  .header__logo {
    flex: 0 1 8rem;
    display: flex;
    align-items: center;

    img {
      width: 100%;
    }

    &.header__logo--cn {
      flex-basis: 7rem;
    }
  }

  .user {
    flex: 0 1 8rem;
    color: #fff;
    position: relative;
    display: flex;
    justify-content: center;
    cursor: pointer;

    &:hover {
      .user__icon {
        border-bottom: 5px solid var(--color-deloitte);
      }

      .user__dropdown {
        grid-template-rows: 1fr;
      }
    }

    .user__icon {
      font-size: 1.5rem;
      flex-basis: 3rem;
      border-bottom: 5px solid #00000000;
      display: grid;
      place-items: center;
      padding-top: 5px;
    }

    .user__dropdown {
      position: absolute;
      top: 4rem;
      left: 50%;
      transform: translateX(-50%);
      width: 16rem;
      display: grid;
      grid-template-rows: 0fr;
      overflow: hidden;
      transition: 0.3s ease-in-out;
      margin-top: 0.5rem;
      background-color: #fff;
      border-radius: 1.5rem;
      box-shadow: 0 2px 5px #00000040;
      padding-inline: 0.5rem;
      z-index: 9;

      &:hover {
        grid-template-rows: 1fr;
      }

      > div {
        min-height: 0;
        color: #333;

        div {
          text-align: center;

          h2 {
            padding-block: 1.25rem;
            font-size: 1rem;
            color: var(--color-dark);
          }

          &.user__links {
            border-radius: 1rem;
            overflow: hidden;
            margin-bottom: 0.5rem;

            p {
              background-color: var(--color-teal1);
              border-radius: 0.25rem;

              &:not(:last-child) {
                margin-bottom: 0.125rem;
              }

              a {
                display: block;
                font-weight: 700;
                padding: 1rem;
                text-decoration: none;
                font-size: 0.875rem;
                color: var(--color-teal7);

                &:hover {
                  background-image: linear-gradient(#0000001a, #0000001a);
                }

                &:active {
                  background-image: linear-gradient(#0003, #0003);
                }
              }
            }
          }
        }
      }
    }

    .user__name {
      font-size: 0.75rem;
    }
  }

  .header__title {
    flex: 1 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-left: 1rem;

    p {
      border-left: 0.25rem solid var(--color-deloitte);
      color: #fff;
      font-size: 1.5rem;
      font-weight: 700;
      padding-left: 0.5rem;
      line-height: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

@media (max-width: 768px) {
  header {
    .header__logo {
      &.header__logo--cn {
        display: none;
      }
    }
    .header__title {
      p {
        font-size: 1rem;
      }
    }

    .user {
      flex-basis: 5rem;
    }
  }
}
</style>
