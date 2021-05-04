<template>
<div class="md-layout md-gutter" id="wrapper">
  <div class="md-layout-item md-size-30 md-small-size-100 md-xsmall-size-100">
    <md-card id="info">
      <md-card-header>
        <div id="icon">
          <md-avatar class="md-large">
            <img src="../assets/profile.png" />
          </md-avatar>
        </div>
      </md-card-header>
      <h1 class="md-display-2">Ryan White</h1>
      <p class="md-subheading">Computer Engineer</p>

      <md-list>
        <md-list-item>
          <md-icon>work</md-icon>
          <a v-smooth-scroll href="#work" style="color: #3f4238" class="md-list-item-text" v-if="isSummary === null">Work History</a>
          <span v-smooth-scroll style="color: #3f4238" class="md-list-item-text" v-if="isSummary !== null">Work History</span>
        </md-list-item>
        <md-list-item>
          <md-icon>code</md-icon>
          <a v-smooth-scroll href="#projects" style="color: #3f4238" class="md-list-item-text" v-if="isSummary === null">Projects</a>
          <span v-smooth-scroll style="color: #3f4238" class="md-list-item-text" v-if="isSummary !== null">Projects</span>
        </md-list-item>
      </md-list>
      <SocialLinks />
      <small style="text-align: center; display:flex; justify-content: center; color: #a37f79;">Created by: &nbsp;<a href="https://heatherhtran.com/" style="margin-left: 4px; color: #997771;">
          Heather Tran</a></small>
    </md-card>
  </div>
  <div class="md-layout-item downmove" id="homeRow" v-if="isSummary === null">
    <WorkRow />
    <ProjectRow v-on:setSummary="setSummary" />
  </div>
  <div class="md-layout-item" v-if="isSummary !== null">
    <ProjectSummary :projectName="isSummary" :json="getJsonObj(isSummary)" @setClose="setClose" />
  </div>
</div>
</template>

<script>
import Vue from "vue";
import VueMaterial from "vue-material";
import SocialLinks from "./SocialLinks.vue";
import WorkRow from "./WorkRow.vue";
import ProjectSummary from "./ProjectSummary.vue";
import ProjectRow from "./ProjectRow.vue";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import VueSmoothScroll from "vue2-smooth-scroll";
import project from "../json/projectDescription.json";
Vue.use(VueSmoothScroll);
Vue.use(VueMaterial);

export default {
  name: "Content",
  components: {
    SocialLinks,
    WorkRow,
    ProjectRow,
    ProjectSummary
  },
  data: function() {
    return {
      isSummary: null,
      project: project
    };
  },
  methods: {
    setSummary(value) {
      window.scrollTo(0, 0);
      this.isSummary = value;
    },
    setClose(value) {
      this.isSummary = value;
    },
    getJsonObj(name) {
      if (name === "Embedded Lighting Controller") {
        return project.elc;
      } else if (name === "Project Lite") {
        return project.pl;
      } else if (name === "SVHS School Timer") {
        return project.time;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
small,
small a {
  color: #fec5bb;
}

.bottom {
  align-items: flex-end;
}

.is-active {
  color: white;
}

#wrapper {
  margin-top: 2em;
  margin-left: 5em;
  margin-right: 5em;
}

@media (max-width: 768px) {
  #wrapper {
    margin-left: 1em;
    margin-right: 1em;
  }

  #info {
    margin-bottom: 1em;
  }
}

@media (max-width: 1024px) {
  #wrapper {
    margin-left: 1em;
    margin-right: 1em;
  }

  #info {
    margin-bottom: 1em;
  }
}

.md-avatar {
  min-width: 175px !important;
  min-height: 175px !important;
  border-radius: 175px !important;
  margin-right: 0px;
  margin-left: 0px;
  align-items: center;
}

#info {
  background-color: var(--seashell);
  position: sticky;
  top: 0;
  padding-bottom: 1.5em;
}

.md-content {
  border: none;
  overflow: hidden !important;
}

.md-list {
  background-color: var(--seashell);
  margin-bottom: 5em;
}

.md-list-item {
  background-color: var(--seashell);
}

.md-list-item-text {
  font-size: 20px;
}

#icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
}

h1 {
  text-align: center;
  margin-bottom: 0.2em;
}

h2 {
  margin-left: 1.2em;
}

p {
  text-align: center;
  font-style: italic;
}

i {
  font-size: 40px !important;
  padding-left: 1.3em;
}

a:hover {
  color: red;
}

.downmove {
  -webkit-animation-name: downmove;
  /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 0.5s;
  /* Safari 4.0 - 8.0 */
  animation-name: downmove;
  animation-duration: 0.5s;
}

@-webkit-keyframes downmove {
  0% {
    margin: -300px 0 0 0;
  }

  100% {
    margin: 0px 0 0 0;
  }
}
</style>
