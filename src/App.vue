<template>
<div id="app">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons" />
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Lato:400,500,700,400italic|Material+Icons" />
  <Background />
</div>
</template>

<script>
import Background from "./components/Background.vue";

import Vue from "vue";
import VueMeta from "vue-meta";
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});
export default {
  name: "App",
  components: {
    Background
  },
  metaInfo: {
    title: "Ryan's Site",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  }
};
</script>
<style>
:root {
  --antique-brass: #b98b73;
  --lighter-brass: #cb997e;
  --desert-sand: #ddbea9;
  --champagne-pink: #ffe8d6;
  --bone: #d4c7b0;
  --ash-gray: #b7b7a4;
  --artichoke: #a5a58d;
  --ebony: #6b705c;
  --black-olive: #3f4238;
  --seashell: #fff3eb;
  --isabelline: #f9f4f0;
  --plat: #edede8;
}

.md-app-container {
  overflow: visible !important;
}

.md-list-item-content {
  height: 60px !important;
}

::selection {
  background: #35251c !important;
  /* WebKit/Blink Browsers */
}

::-moz-selection {
  background: #35251c !important;
  /* Gecko Browsers */
}

html,
body,
#app {
  max-width: 100vw !important;
  background-color: var(--champagne-pink);
}
</style>
