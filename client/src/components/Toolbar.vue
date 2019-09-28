<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-img
        :src="'/i3.jpg'"
        :gradient="sidebarOverlayGradiant"
        height="100%"
      >
        <v-list dense>
          <v-list-tile to="/" v-if="isLoggedIn ">
            <v-list-tile-action>
              <v-icon>receipt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Facturas</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/crear-factura" v-if="isLoggedIn  && isAdminUser">
            <v-list-tile-action>
              <v-icon>fiber_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Crear factura</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/orden" v-if="isLoggedIn">
            <v-list-tile-action>
              <v-icon>mdi-package-variant</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Órdenes</v-list-tile-title>
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
          <v-list-tile to="/gestion-pedido" v-if="isLoggedIn && isAdminUser">
            <v-list-tile-action>
              <v-icon>mdi-table-edit</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Gestionar Orden</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/reportes" v-if="isLoggedIn && isAdminUser">
            <v-list-tile-action>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Reportes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-img>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-thin display-1">Deliver Roques</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="!isLoggedIn">¿Eres comercio?:</v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat v-if="!isLoggedIn" to="/iniciar-sesion">
          <v-icon class="mr-1">mdi-fingerprint</v-icon>Iniciar Sesión
        </v-btn>
        <v-btn flat v-if="isLoggedIn" @click="logoutAndSetCurrentItems()">
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
    if (!this.isLoggedIn) {
      return router.push('/tracking');
    }
    return this;
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isAdminUser',
    ]),
    sidebarOverlayGradiant() {
      return 'rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 0.74)';
    },
  },
  methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
    ...mapActions('bill', [
      'setNotNullBillItems',
    ]),
    ...mapActions('order', [
      'setNotNullOrderItems',
    ]),
    logoutAndSetCurrentItems() {
      this.setNotNullBillItems();
      this.setNotNullOrderItems();
      this.logout();
    },
  },
};
</script>
<style>
</style>
