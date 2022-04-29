<template>
<v-container fluid class="pa-0">
      <home :isXs="isXs" :componentData="appData ? appData.landingPage.homeSection : undefined" />
      <about :isXs="isXs" :componentData="appData ? appData.landingPage.accompaniementSection : undefined"/>
      <autoEvaluationSection :isXs="isXs" :componentData="appData ? appData.landingPage.autoEvaluationSection : undefined"/>
      <download @yearInCompanySelected="setYearInCompany" :componentData="appData ? appData.landingPage.financementSection : undefined" :isXs="isXs"/>
      <progressionSection :isXs="isXs" :componentData="appData ? appData.landingPage.progressionSection : undefined"/>
      <pricing :yearsInCompany="yearsInCompany" :componentData="appData ? appData.landingPage.offersSection : undefined" :isXs="isXs"/>
      <regionSection :isXs="isXs" :componentData="appData ? appData.landingPage.regionSection : undefined"/>
      <!--
      <startproject :yearsInCompany="yearsInCompany" :isXs="isXs"/>
      -->
      <company :isXs="isXs" :componentData="appData ? appData.landingPage.ourCompanySection : undefined"/>
      <contact :isXs="isXs" :componentData="appData ? appData.landingPage.contactSection : undefined"/>
</v-container>
</template>

<script>
import home from "../components/HomeSection";
import about from "../components/AboutSection";
import download from "../components/DownloadSection";
import progressionSection from "../components/ProgressionSection";
import regionSection from "../components/RegionSection";
import pricing from "../components/PricingSection";
import startproject from "../components/StartProjectSection";
import company from "../components/OurCompanySection";
import contact from "../components/ContactSection";
import autoEvaluationSection from "../components/AutoEvaluationSection";

import AppDataFr from '../../api/collections/AppDataFr'

export default {
  name: "LandingPage",

  components: {
    home,
    about,
    download,
    pricing,
    startproject,
    company,
    contact,
    progressionSection,
    regionSection,
    autoEvaluationSection
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
    yearsInCompany : 5,
    isXs : false,
    appData : {
      landingPage : {

      }
    }
  }),

  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "white";
      this.flat = true;
    }
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "white";
        this.flat = false;
      } else {
        this.color = "white";
        this.flat = true;
      }
    },
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    setYearInCompany(newYears){
      this.yearsInCompany = newYears;
    },
    onResize() {
        this.isXs = window.innerWidth < 850;
    },
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });

    this.$subscribe('appdatafr.landingpage', [])
    this.$autorun((val) => {
      this.appData = AppDataFr.find().fetch()[0]
    })
  }, 
};
</script>

<style>

</style>