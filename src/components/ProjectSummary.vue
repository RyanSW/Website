<template>
<div class="move">
  <TitleCard :title="projectName" :isPage="true" icon="close" id="projects" @passClose="closePage" />
  <div v-for="item in json" v-bind:key="item.text">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="join md-layout-item  md-layout md-gutter">
        <div class="md-layout-item md-size-40 md-small-size-100 img">
          <ImageCard :src="item.src" />
        </div>
        <div class="md-layout-item txt">
          <TextCard :content="item.text" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Vue from "vue";
import TitleCard from "./TitleCard.vue";
import ImageCard from "./ImageCard.vue";
import TextCard from "./TextCard.vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
Vue.use(VueMaterial);
export default {
  name: "ProjectSummary",
  components: {
    TitleCard,
    ImageCard,
    TextCard
  },
  props: ["projectName", "json"],
  data() {
    return {
      close: "filled"
    };
  },
  methods: {
    closePage(value) {
      this.close = value;
      console.log(this.close);
      this.$emit("setClose", this.close);
    }
  }
};
</script>

<style>
.move {
  -webkit-animation-name: upmove;
  /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 0.5s;
  /* Safari 4.0 - 8.0 */
  animation-name: upmove;
  animation-duration: 0.5s;
}

@-webkit-keyframes upmove {
  0% {
    margin: 300px 0 0 0;
  }

  100% {
    margin: 0px 0 0 0;
  }
}
</style>
