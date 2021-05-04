<template>
<div class="md-layout-item">
  <md-card>
    <md-card-header>
      <p class="md-title">{{ position }}</p>
    </md-card-header>
    <md-card-content>{{ content }}</md-card-content>
  </md-card>
</div>
</template>

<script>
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);
export default {
  name: "TextCard",
  props: ["content", "position"]
};
</script>

<style scoped>
.md-card-content {
  font-size: 17px;
}

.md-title {
  font-weight: bold;
  color: var(--black-olive);
  text-decoration: underline;
  margin-bottom: 0.5em;
}

.md-card-header {
  width: 100%;
  padding-bottom: 8px;
  padding-top: 8px;
}

.md-card {
  overflow-y: auto;
  background-color: #f5f6f4;
}

.md-body-1 {
  font-size: 16px;
}

.md-card,
img,
.md-card-area {
  min-height: 265px;
  max-height: 265px;
}

.link {
  align-self: flex-end;
}

.md-card {
  margin-bottom: 1em;
}
</style>
