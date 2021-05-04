<template>
<div>
  <TitleCard title="Projects" icon="code" id="projects" />
  <div class="md-layout md-gutter md-alignment-center">
    <div class="join md-layout-item  md-layout md-gutter">
      <div class="md-layout-item md-size-40 md-small-size-100 img">
        <ImageCard :title="project.elc.title" :src="project.elc.src" :isJob="project.elc.isJob" :begin="project.elc.begin" :end="project.elc.end" @passSummary="returnSummary" />
      </div>
      <div class="md-layout-item txt">
        <TextCard :content="project.elc.content" :position="project.elc.position" />
      </div>
    </div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="join md-layout-item  md-layout md-gutter">
      <div class="md-layout-item md-size-40 md-small-size-100 img">
        <ImageCard :title="project.pl.title" :src="project.pl.src" :isJob="project.pl.isJob" :begin="project.pl.begin" :end="project.pl.end" @passSummary="returnSummary" />
      </div>
      <div class="md-layout-item txt">
        <TextCard :content="project.pl.content" />
      </div>
    </div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="join md-layout-item  md-layout md-gutter">
      <div class="md-layout-item md-size-40 md-small-size-100 img">
        <ImageCard :title="project.time.title" :src="project.time.src" :isJob="project.time.isJob" @passSummary="returnSummary" />
      </div>
      <div class="md-layout-item txt">
        <TextCard :content="project.time.content" />
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
import project from "../json/project.json";
Vue.use(VueMaterial);
export default {
  name: "ProjectRow",
  components: {
    TitleCard,
    ImageCard,
    TextCard
  },
  data() {
    return {
      project: project,
      summary: ""
    };
  },
  methods: {
    returnSummary(value) {
      this.summary = value;
      this.$emit("setSummary", this.summary);
    }
  }
};
</script>

<style>
.md-layout {
  margin-top: 1em;
}

.img {
  padding-right: 0 !important;
}

.txt {
  padding-left: 0 !important;
}
</style>
