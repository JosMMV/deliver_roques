<template>
  <v-app dark>
    <Toolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>Distribuidor&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue';

export default {
  components: {
    Toolbar,
  },
  props: {
    source: String,
  },
};
</script>
