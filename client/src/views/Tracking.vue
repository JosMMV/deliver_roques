
<template>
  <v-container>
    <img
      class="imagen"
      :src="'/cajas_empaque_inpack.png'"
    />
    <v-text-field
      class="mx-3"
      flat
      label="Introduzca # de tracking"
      prepend-inner-icon="search"
      solo-inverted
      :value="searching"
      @input="setSearching"
      @keydown.enter="searchTracking"
    ></v-text-field>

    <v-alert type="error" :value="trackingError">{{trackingError}}</v-alert>

    <v-timeline
      v-if="isSearching"
    >
      <v-timeline-item :color="'cyan'" small v-if="isPacked">
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-light cyan--text`"
            v-text="currentTracking.packed"
          >
          </span>
           <div>
            <img :src="'/package.png'" style="width:40%;height:auto;"/>
          </div>
          <template>
            <v-divider></v-divider>
          </template>
        </template>
        <div class="py-3">
          <h2 :class="`headline font-weight-bold mb-3 cyan--text`">
            Empacado
          </h2>
          <div>
            Empacado en los mejores cartones del mundo, traídos directamente de la india.
            Adicionalmente se cubrío con esas burbujas de plástico que todo el mundo desea
            romper con sus pulgares.
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item :color="'green'" small v-if="isCharged">
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-light green--text`"
            v-text="currentTracking.charged"
          >
          </span>
           <div>
            <img :src="'/serv-1.png'" style="width:40%;height:auto;"/>
          </div>
          <template>
            <v-divider></v-divider>
          </template>
        </template>
        <div class="py-3">
          <h2 :class="`headline font-weight-bold mb-3 green--text`">
            Cargado
          </h2>
          <div>
            Cargado en los mejores camiones bildados. Para asegurar ese cartón tan especial
            (y tu paquete, por supuesto).
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item :color="'blue'" small v-if="isOnWay">
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-light blue--text`"
            v-text="currentTracking.way"
          >
          </span>
           <div>
            <img :src="'/411712.png'" style="width:40%;height:auto;"/>
          </div>
          <template>
            <v-divider></v-divider>
          </template>
        </template>
        <div class="py-3">
          <h2 :class="`headline font-weight-bold mb-3 blue--text`">
            En camino
          </h2>
          <div>
            Nuestros camiones siempre van a la máxima velocidad posible dentro de los márgenes
            de la ley. Tu paquete estará muy pronto en tus manos.
          </div>
        </div>
      </v-timeline-item>

      <v-timeline-item :color="'red'" small v-if="isSubsidiary">
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-light red--text`"
            v-text="currentTracking.subsidiary"
          >
          </span>
           <div>
            <img :src="'/1337104.png'" style="width:40%;height:auto;"/>
          </div>
          <template>
            <v-divider></v-divider>
          </template>
        </template>
        <div class="py-3">
          <h2 :class="`headline font-weight-bold mb-3 red--text`">
            En Sucursal
          </h2>
          <div>
            Tu paquete ha llegado, como se esperaba, sano y salvo. Ven lo más pronto posible
            a buscarlo. Nuestros empleados te atenderán tan bien que seguramente querrás
            conocerlos más.
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  computed: {
    ...mapState('tracking', [
      'searching',
      'currentTracking',
      'trackingError',
    ]),
    ...mapGetters('tracking', [
      'isSearching',
      'isPacked',
      'isCharged',
      'isOnWay',
      'isSubsidiary',
    ]),
  },
  methods: {
    ...mapMutations('tracking', [
      'setSearching',
    ]),
    ...mapActions('tracking', [
      'searchTracking',
    ]),
  },
};
</script>
<style>
#imagen {
  display: flex;
  justify-content: center;
}
.imagen {
  width: 25%;
  height: auto;
}
</style>
