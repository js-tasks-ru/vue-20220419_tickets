<template>
  <component :is="tag" class="link" :to="to"><slot /></component>
</template>

<script>
export default {
  name: 'UiLink',

  props: {
    to: {
      type: [String, Object],
    },
    tag: {
      type: [String, Object],
      default: 'router-link',
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
