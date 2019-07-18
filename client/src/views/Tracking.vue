
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
    <v-timeline
      v-if="isSearching"
    >
      <v-timeline-item
        v-for="(procedure, i) in procedures"
        :key="i"
        :color="procedure.color"
        small
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-light ${procedure.color}--text`"
            v-text="procedure.timestamp"
          >
          </span>
           <div>
            <img v-bind:src="procedure.img" style="width:40%;height:auto;"/>
          </div>
          <template>
            <v-divider></v-divider>
          </template>
        </template>
        <div class="py-3">
          <h2 :class="`headline font-weight-bold mb-3 ${procedure.color}--text`">
            {{ procedure.text }}
          </h2>
          <div>
            {{ procedure.description }}
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
  data: () => ({
    procedures: [
      {
        color: 'cyan',
        timestamp: '20/06/19 a las 09:35am',
        text: 'Empacado',
        description: 'Empacado en los mejores cartones del mundo, traídos directamente de la india. Adicionalmente se cubrío con esas burbujas de plástico que todo el mundo desea romper con sus pulgares.',
        img: '/package.png',
      },
      {
        color: 'green',
        timestamp: '20/06/19 a las 12:15pm',
        text: 'Cargado',
        description: 'Cargado en los mejores camiones bildados. Para asegurar ese cartón tan especial (y tu paquete, por supuesto).',
        img: '/serv-1.png',
      },
      {
        color: 'blue',
        timestamp: '21/06/19 a las 07:30am',
        text: 'En Camino',
        description: 'Nuestros camiones siempre van a la máxima velocidad posible dentro de los márgenes de la ley. Tu paquete estará muy pronto en tus manos.',
        img: '/411712.png',
      },
      {
        color: 'red',
        timestamp: '23/06/19 a las 02:31pm',
        text: 'En Sucursal',
        description: 'Tu paquete ha llegado, como se esperaba, sano y salvo. Ven lo más pronto posible a buscarlo. Nuestros empleados te atenderán tan bien que seguramente querrás conocerlos más.',
        img: '/1337104.png',
      },
    ],
  }),
  computed: {
    ...mapState('tracking', [
      'searching',
      'trackingNumber',
    ]),
    ...mapGetters('tracking', [
      'isSearching',
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
