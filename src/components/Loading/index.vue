<script lang="ts" setup>
const props = defineProps(['loading'])
</script>

<template>
  <div class="loading-cpn" :class="{ loading: props.loading }">
    <div class="spin">
      <a-spin dot></a-spin>
    </div>
  </div>
</template>

<style scoped>
.loading-cpn {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms linear, visibility 0ms linear 300ms;
}

.loading-cpn.loading {
  opacity: 1;
  visibility: visible;
  transition: visibility 0ms linear;
}

.spin {
  position: absolute;
  top: calc(50vh - 50px);
  left: calc(50vw - 25px);
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
}
</style>
