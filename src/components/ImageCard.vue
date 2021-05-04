<template>
<div class="md-layout-item">
  <md-card :class="{ largerCard: isJob }">
    <md-card-media-cover>
      <md-card-media :style="cssProps">
        <img :src="src" :class="{ largerCard: isJob }" />
      </md-card-media>
      <md-card-area :class="{ largerCard: isJob }">
        <md-card-header>
          <p class="md-title">
            {{ title }}
          </p>
          <span class="date" v-if="begin !== undefined && end !== undefined">{{ begin }} - {{ end }}</span>
          <md-button :href="link" v-if="isJob === false" class="link" :md-ripple="false" @click.native="returnSummary()" :project="title">
            READ MORE
          </md-button>
        </md-card-header>
      </md-card-area>
    </md-card-media-cover>
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
  name: "ImageCard",
  props: ["title", "src", "isJob", "color", "link", "begin", "end"],
  computed: {
    cssProps() {
      return {
        "--color": this.color
      };
    }
  },
  methods: {
    returnSummary() {
      this.$emit("passSummary", this.title);
    }
  }
};
</script>

<style scoped>
.md-title {
  font-weight: bold;
  margin-top: 0px !important;
  text-align: center;
}

.md-card-header {
  display: flex;
  width: 100%;
  padding-bottom: 8px;
  padding-top: 8px;
  align-items: center;
}

.md-body-1 {
  font-size: 16px;
}

img {
  object-fit: cover;
}

.md-card,
img,
.md-card-area {
  max-height: 265px;
  min-height: 265px;
}

.md-card-area {
  justify-content: center !important;
  align-items: center !important;
}

img {
  filter: brightness(50%);
}

.md-expand-active .md-card-media {
  filter: brightness(70%);
}

.md-card-expand-content {
  margin-left: 1em;
  margin-right: 1em;
}

.md-card-expand i {
  color: #fff !important;
  font-size: 50px !important;
  /* Preferred icon size */
}

i {
  color: #fff !important;
}

.link {
  background-color: transparent !important;
  border: none;
  width: 50%;
}

.link:hover {
  background-color: transparent !important;
}

.md-card-media {
  background-color: var(--color);
}

.md-button-content {
  color: black !important;
}

.date {
  font-style: italic;
  text-align: center;
}

.md-card {
  margin-bottom: 1em;
}
</style>
