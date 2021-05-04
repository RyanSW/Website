<template>
<div id="pageWrapper">
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <Content />
</div>
</template>

<script>
import Content from "./Content.vue";
export default {
  name: "Background",
  components: {
    Content
  }
};
</script>

<style>
#pageWrapper {
  padding-bottom: 3em;
}

html {
  height: 100%;
}

body {
  margin: 0;
}

.bg {
  animation: slide 10s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #fff3eb 50%, #b7b7a4 50%);
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 30s;
}

.bg3 {
  animation-duration: 31s;
}

.content {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25em;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  left: 50%;
  padding: 10vmin;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  font-family: monospace;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(25%);
  }
}
</style>
