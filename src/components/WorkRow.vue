<template>
<div id="work-row">
  <TitleCard title="Work" icon="work" id="work" />
  <div class="md-layout md-gutter md-alignment-center">
    <div class="join md-layout-item  md-layout md-gutter">
      <div class="md-layout-item  md-size-40 md-small-size-100 img">
        <ImageCard :title="work.jpl.title" :src="work.jpl.src" :isJob="work.jpl.isJob" :begin="work.jpl.begin" :end="work.jpl.end" />
      </div>
      <div class="md-layout-item txt">
        <TextCard :content="work.jpl.content" :position="work.jpl.position" />
      </div>
    </div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="join md-layout-item  md-layout md-gutter reverse">
      <div class="md-layout-item txt">
        <TextCard :content="work.cpp1.content" :position="work.cpp1.position" />
      </div>
      <div class="md-layout-item md-size-40 md-small-size-100 img">
        <ImageCard :title="work.cpp1.title" :src="work.cpp1.src" :isJob="work.cpp1.isJob" :begin="work.cpp1.begin" :end="work.cpp1.end" />
      </div>
    </div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="join md-layout-item  md-layout md-gutter">
      <div class="md-layout-item md-size-40 md-small-size-100 img">
        <ImageCard :title="work.cpp2.title" :src="work.cpp2.src" :isJob="work.cpp2.isJob" :begin="work.cpp2.begin" :end="work.cpp2.end" />
      </div>
      <div class="md-layout-item txt">
        <TextCard :content="work.cpp2.content" :position="work.cpp2.position" />
      </div>
    </div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="join md-layout-item  md-layout md-gutter reverse">
      <div class="md-layout-item txt">
        <TextCard :content="work.bar.content" :position="work.bar.position" />
      </div>
      <div class="md-layout-item  md-size-40 md-small-size-100 img">
        <ImageCard :title="work.bar.title" :src="work.bar.src" :isJob="work.bar.isJob" :begin="work.bar.begin" :end="work.bar.end" />
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
import work from "../json/work-history.json";
Vue.use(VueMaterial);
export default {
  name: "WorkRow",
  components: {
    TitleCard,
    ImageCard,
    TextCard
  },
  data() {
    return {
      work: work
    };
  }
};
</script>

<style>
#work-row {
  margin-bottom: 2em;
}

.md-layout {
  margin-top: 1em;
}

.img {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.txt {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.join .md-card {
  padding: 0;
  margin: 0;
}

@media (max-width: 768px) {
  .reverse {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
