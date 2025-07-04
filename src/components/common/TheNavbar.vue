<script setup>
/* import { ref } from 'vue';
import TheHamburger from '@/components/common/TheHamburger.vue'; */

defineProps({
  backgroundColor: {
    type: String,
    default: '#fff'
  },
  /* example of navLinks
    [
        { 
            title: 'Home', 
            href: '#', 
        },
        {
            title: 'Admin',
            children: [
                { title: 'Users', href: '#', icon: ['fas', 'fa-users'] },
            ]
        }
    ]
    */
  navLinks: {
    type: Array,
    default: () => []
  }
});
// const hamExpand = ref(false);
</script>

<template>
  <nav>
    <div class="navLinks">
      <template v-for="(link, idx) of navLinks">
        <div class="nav__group" v-if="link.children" :key="'sidebarGroup' + idx">
          <div :for="'sidebarGroupToggle' + idx" class="nav__groupTitle">
            <div class="sidebar__linkName">
              {{ link.title }} <v-icon name="io-chevron-down-circle" />
            </div>
            <div class="sidebar__down"></div>
          </div>
          <div class="nav__linkWrap">
            <div>
              <div
                class="nav__link"
                v-for="(subLink, subLinkIdx) of link.children"
                :key="'subLink' + idx + subLinkIdx"
              >
                <RouterLink :to="subLink.href" :title="subLink.title">
                  <div class="sidebar__linkName">{{ subLink.title }}</div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="nav__link" v-else :key="'sidebarLink' + idx">
          <RouterLink :to="link.href" :title="link.title">
            {{ link.title }}
          </RouterLink>
        </div>
      </template>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background-color: v-bind(backgroundColor);
  height: 2.75rem;
  position: sticky;
  top: 4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07);
  border-bottom: 3px solid var(--color-deloitte);
  /* border-bottom: 3px solid var(--color-teal5); */
  display: flex;
  padding-inline: 2rem;
  z-index: 999;
  /* background-color: var(--color-green5); */

  .navLinks {
    height: 100%;
    flex-grow: 1;
    display: flex;

    .nav__link {
      a {
        height: 100%;
        text-decoration: none;
        color: #333;
        display: block;
        padding-inline: 0.75rem;
        font-size: 1rem;
        align-content: center;
        position: relative;
        overflow: hidden;

        &:hover:not(.router-link-active) {
          background-color: rgba(119, 160, 46, 0.1);
          /* background-color: #0097a929; */

          &::after {
            top: 2.375rem;
            border-top: 0.25rem solid var(--color-green1);
            /* border-top: 0.25rem solid var(--color-teal2); */
          }
        }
        &.router-link-active {
        }
        &.router-link-active::after {
          top: 0;
          transition: top 0.3s ease-in-out;
        }

        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 2.75rem;
          background-color: rgba(119, 160, 46, 0.1);
          /* background-color: #0097a929; */
          position: absolute;
          border-top: 0.25rem solid var(--color-deloitte);
          /* border-top: 0.25rem solid var(--color-teal5); */
          top: 2.75rem;
          left: 0;
        }
      }
    }

    .nav__group {
      position: relative;
      height: 100%;

      &:hover {
        .nav__linkWrap {
          grid-template-rows: 1fr;
          box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 4px 1px;
        }
      }

      .nav__groupTitle {
        cursor: pointer;
        color: #fff;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        height: 100%;

        .sidebar__linkName {
          font-size: 1rem;
        }
      }

      .nav__linkWrap {
        position: absolute;
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: 0.3s ease-in-out;
        top: 100%;
        background-color: #fdfdfd;
        border-radius: 0px 0px 15px 3px !important;
        min-width: 10rem;
        margin-top: 0.0625rem;

        > div {
          min-height: 0;
          width: 100%;
          overflow: hidden;

          .nav__link {
            &:first-child {
              padding-top: 0.5rem;
            }
            &:last-child {
              padding-bottom: 0.5rem;
            }

            a {
              padding: 0.5rem 1rem;
              color: #000;
              text-decoration: none;
              display: block;
              font-size: 1rem;

              &:hover {
                color: #fff;
                background-color: var(--color-green-primary);
              }
            }
          }
        }
      }
    }
  }
}
@media (max-width: 800px) {
  nav {
    padding-left: 1rem;
    /* height: auto;
    min-height: 3rem;
    display: block;

    .nav__logo {
      display: flex;
      gap: 1rem;
    }

    .navLinks {
      display: block;
    }*/
  }
}
</style>
