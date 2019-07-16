<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile to="/" v-if="isLoggedIn">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Inicio</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/gestion-pedido">
          <v-list-tile-action>
            <v-icon>mdi-table-edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Gestionar Pedido</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/reportes">
          <v-list-tile-action>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Reportes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/tracking">
          <v-list-tile-action>
            <v-icon>mdi-truck-check</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tracking</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Distribuidor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="!isLoggedIn">¿Eres comercio?:</v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat v-if="!isLoggedIn" to="iniciar-sesion">
          <v-icon class="mr-1">mdi-fingerprint</v-icon>Iniciar Sesión
        </v-btn>
        <v-btn flat v-if="isLoggedIn" @click="logoutAndSetCurrentProject">
          <v-icon class="mr-1">exit_to_app</v-icon>Cerrar Sesión
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '../router';

export default {
  mounted() {
    if (!this.isLoggedIn && router.currentRoute.path === '/') {
      return router.push('/login');
    }
    return this;
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
    logoutAndSetCurrentProject() {
      this.logout();
      this.setCurrentProject(null);
    },
  },
};
</script>

<style>

</style>
