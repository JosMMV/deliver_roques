<template>
  <v-container>
    <v-text-field
      class="mx-3"
      flat
      label="Introduzca # de orden"
      prepend-inner-icon="search"
      solo-inverted
      :value="searching"
      @input="setSearching"
      @keydown.enter="searchOrder(!$v.searching.minLength || !$v.searching.numeric)"
    ></v-text-field>
    <v-snackbar
      v-if="thereIsError"
      v-model="snackbar"
      :color="'error'"
      :timeout="0"
    >
      El número de orden debe tener al menos {{$v.searching.$params.minLength.min}}
      caracteres numéricos.
    </v-snackbar>
    <v-layout align-center justify-center class="mb-4">
      <h2
        class="font-weight-thin display-1"
        v-if="isSearching"
      >
        Editando pedido número {{ orderNumber }}
      </h2>
    </v-layout>
    <v-timeline
      align-top
      v-if="isSearching"
    >
      <v-timeline-item
        v-for="(procedure, i) in procedures"
        :key="i"
        :color="procedure.color"
        :icon="'mdi-timer'"
        fill-dot
      >
        <v-card
          :color="procedure.color"
          dark
        >
          <v-card-title class="title">{{ procedure.text }}</v-card-title>
          <v-card-text class="headline font-weight-bold">
            <img class="imagen" :src="procedure.img"/>
            <p>{{ timestamps[i].timestamp }}</p>
            <v-btn
              v-if="!!timestamps[i].timestamp"
              :color="procedure.color"
              outline
              disabled
            >
              Añadir timestamp
            </v-btn>
            <v-btn
              v-else
              :color="'black'"
              outline
              @click="anadirTimestamp(i)"
            >
              Añadir timestamp
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <DialogComfirm
      @OkClicked="OkClicked"
      @CancelClicked="dialog1 = false"
      :dialog="dialog1"
    />
  </v-container>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from 'vuex';
import { required, minLength, numeric } from 'vuelidate/lib/validators';
import DialogComfirm from '../components/DialogConfirm.vue';

export default {
  data: () => ({
    procedures: [
      {
        color: 'cyan',
        text: 'Empacado',
        img: '/package.png',
      },
      {
        color: 'green',
        text: 'Cargado',
        img: '/serv-1.png',
      },
      {
        color: 'blue',
        text: 'En Camino',
        img: '/411712.png',
      },
      {
        color: 'red',
        text: 'En Sucursal',
        img: '/1337104.png',
      },
    ],
    dialog1: false,
    dialog2: false,
    snackbar: true,
  }),
  validations: {
    searching: {
      required,
      minLength: minLength(4),
      numeric,
    },
  },
  components: {
    DialogComfirm,
  },
  computed: {
    ...mapState('order', [
      'searching',
      'orderNumber',
      'timestamps',
      'selectedItem',
      'error',
    ]),
    ...mapGetters('order', [
      'isSearching',
      'thereIsError',
    ]),
  },
  methods: {
    ...mapMutations('order', [
      'setSearching',
      'editTimestamp',
      'setSelectedItem',
    ]),
    ...mapActions('order', [
      'searchOrder',
      'addTimestamp',
    ]),
    anadirTimestamp(i) {
      this.setSelectedItem(i);
      this.dialog1 = true;
    },
    OkClicked() {
      this.dialog1 = false;
      this.addTimestamp();
    },
  },
};
</script>

<style>
  .imagen {
    width:20%;
    height:auto;
  }
</style>
