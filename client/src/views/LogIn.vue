<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <h1>Iniciar Sesión</h1>
      <v-text-field
        label="Correo"
        placeholder="Ingrese su correo"
        :value="loginEmail"
        @input="setLoginEmail"
      />
      <v-text-field
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        type="password"
        autocomplete="new-password"
        :value="loginPassword"
        @input="setLoginPassword"
      />
      <v-alert type="error" :value="loginError">{{loginError}}</v-alert>

      <v-btn dark @click="login">
        <v-icon class="mr-2">mdi-fingerprint</v-icon>
        Acceder
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'LogIn',
  computed: {
    ...mapState('authentication', [
      'loginEmail',
      'loginPassword',
      'loginError',
    ]),
  },
  methods: {
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword',
    ]),
    ...mapActions('authentication', [
      'login',
    ]),
  },
};
</script>

<style>

</style>
