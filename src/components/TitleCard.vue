<template>
<md-card :id="id">
  <md-card-header class="md-display-2">
    <p>{{ title }}</p>
    <md-icon @click.native="closePage()">{{ icon }}</md-icon>
  </md-card-header>
</md-card>
</template>
<script>
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);
export default {
  name: "TitleCard",
  props: ["title", "icon", "id", "isPage"],
  methods: {
    closePage() {
      if (this.isPage) {
        this.$emit("passClose", null);
      }
    }
  }
};
</script>

<style scoped>
p {
  margin: 0px;
}

.md-card {
  background-color: var(--plat) !important;
  user-select: none;
  margin-left: 0px;
  margin-right: 0px;
}

@media (max-width: 415px) {
  p {
    font-size: 25pt;
  }

  .md-display-2 {
    margin-left: 0px;
  }
}

@media (max-width: 360px) {
  p {
    font-size: 18pt;
  }
}

@media (max-width: 1024px) {
  .md-card {
    width: 100%;
  }
}

.md-display-2 {
  color: rgba(0, 0, 0, 0.54) !important;
  text-align: left;
  margin-left: 20px;
  font-size: 32pt;
  margin-bottom: 0px;
}

.md-card-header {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

i {
  margin: 0;
  margin-top: 5px;
  margin-right: 20px;
  font-size: 30px !important;
}
</style>
