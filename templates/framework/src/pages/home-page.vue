<template>
  <div class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  data() {
    return {
      name: this.$configuration.layoutManager.currentDevice,
    };
  },
};
</script>
