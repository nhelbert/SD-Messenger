<template>
  <v-app id="MyApp" :style="mCheckColor()">
    <v-content>
      <v-fab-transition>
        <router-view />
      </v-fab-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (this.$router.app._route.path != "/") {
      this.$router.push("/");
    }
  },
  methods: {
    mCheckColor() {
      return "background-color:" + this.sStrColorBackground;
    }
  }
};
</script>
<style>
#MyApp {
  background: rgba(210, 210, 210, 0.5);
  font-family: Montserrat-Medium;
}
#transparent {
  background-color: transparent;
}
</style>