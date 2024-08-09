<script setup>
defineProps({
  backgroundColor: {
    type: String,
    default: '#252525'
  },
  /* example of sidebarLinks
    [
        { 
            title: 'Home', 
            href: '#', 
            icon: ['fas', 'fa-book-open'],
        },
        {
            title: 'Admin',
            icon: ['fas', 'fa-user-shield'],
            children: [
                { title: 'Users', href: '#', icon: ['fas', 'fa-users'] },
            ]
        }
    ]
    */
  sidebarLinks: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <nav>
    <div class="sidebar__wrap">
      <template v-for="(link, idx) of sidebarLinks">
        <div class="sidebar__group" v-if="link.children" :key="'sidebarGroup' + idx">
          <input type="checkbox" :id="'sidebarGroupToggle' + idx" />
          <label :for="'sidebarGroupToggle' + idx" class="sidebar__groupTitle">
            <div v-if="link.icon" class="sidebar__icon">
              <font-awesome-icon :icon="[...link.icon]" />
            </div>
            <div class="sidebar__linkName">
              <h3>{{ link.title }}</h3>
            </div>
            <div class="sidebar__down">
              <font-awesome-icon :icon="['fas', 'chevron-down']" />
            </div>
          </label>
          <div class="sidebar__linkWrap">
            <div>
              <div
                class="sidebar__link"
                v-for="(subLink, subLinkIdx) of link.children"
                :key="'subLink' + idx + subLinkIdx"
              >
                <RouterLink :to="subLink.href" :title="subLink.title">
                  <div v-if="subLink.icon" class="sidebar__icon">
                    <font-awesome-icon :icon="[...subLink.icon]" />
                  </div>
                  <div class="sidebar__linkName">{{ subLink.title }}</div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar__link" v-else :key="'sidebarLink' + idx">
          <RouterLink :to="link.href" :title="link.title">
            <div v-if="link.icon" class="sidebar__icon">
              <font-awesome-icon :icon="[...link.icon]" />
            </div>
            <div class="sidebar__linkName">{{ link.title }}</div>
          </RouterLink>
        </div>
      </template>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  padding: 1rem 0.375rem 0;
  overflow: hidden;
  background-color: v-bind(backgroundColor);
  height: 3rem;
  position: sticky;
  top: 4rem;
  box-shadow: 0 5px 10px #00000052;

  .sidebar__wrap {
    overflow: auto;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 4rem;

    &::-webkit-scrollbar {
      display: none;
    }

    .sidebar__icon {
      width: 1rem;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
    }

    .sidebar__link {
      position: relative;

      a {
        text-decoration: none;
        /* color: #ccc; */
        color: #d7d7d7;
        /* color: #aeaeae; */
        padding-left: 1.25rem;
        padding-right: 0.375rem;
        border-radius: 1rem;
        /* background-color: #333; */
        height: 2rem;
        font-size: 0.875rem;
        font-weight: 700;
        display: flex;
        align-items: center;

        &:hover:not(.router-link-active) {
          background-color: var(--color-gray11);
          color: #fff;
          background-image: linear-gradient(#0000006a, #0000006a);
        }

        &.router-link-active {
          background-color: var(--color-teal6);
          color: #fff;
        }

        .sidebar__linkName {
          margin-left: 1rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }

    .sidebar__group {
      background-color: var(--color-gray11);
      background-image: linear-gradient(#0000006a, #0000006a);
      border-radius: 1rem;
      margin-block: 0.25rem;

      &:hover {
        background-color: var(--color-gray11);
        background-image: linear-gradient(#0004, #0004);
      }

      &:has(input[type='checkbox']:checked) {
        background-color: var(--color-gray11);
        background-image: linear-gradient(#0004, #0004);
      }

      input[type='checkbox'] {
        display: none;

        &:checked ~ .sidebar__groupTitle {
          color: #fff;

          .sidebar__down {
            transform: rotate(-180deg);
          }
        }

        &:checked ~ .sidebar__linkWrap {
          grid-template-rows: 1fr;
        }
      }

      .sidebar__groupTitle {
        cursor: pointer;
        color: #ccc;
        padding-block: 0.75rem;
        display: flex;
        align-items: center;
        padding-inline: 1.25rem;

        .sidebar__linkName {
          margin-left: 1rem;
          overflow: hidden;

          h3 {
            font-size: 1rem;
            font-size: 0.875rem;
          }
        }

        .sidebar__down {
          margin-left: auto;
          transition: 0.3s ease-in-out;
          overflow: hidden;
        }
      }

      .sidebar__linkWrap {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: 0.3s ease-in-out;

        > div {
          min-height: 0;
          width: 100%;
          overflow: hidden;

          .sidebar__link {
            &:last-child {
              margin-bottom: 0.75rem;
            }

            a {
              &:hover:not(.router-link-active) {
                background-color: var(--color-gray11);
                background-image: linear-gradient(#0001, #0001);
              }
            }
          }
        }
      }
    }
  }
}
</style>
