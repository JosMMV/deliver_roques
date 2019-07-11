<template>
  <v-container>
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
          :class="`headline font-weight-bold ${procedure.color}--text`"
          v-text="procedure.time"
        ></span>
      </template>
      <div class="py-3">
        <h2 :class="`headline font-weight-light mb-3 ${procedure.color}--text`">
          {{ procedure.text }}
        </h2>
        <div>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut,
          sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando
          voluptatibus, vix an salutandi sententiae.
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
        time: '20/06/19 a las 09:35am',
        text: 'Empacado',
      },
      {
        color: 'green',
        time: '21/06/19 a las 08:15am',
        text: 'En camino',
      },
      {
        color: 'blue',
        time: '',
        text: '',
      },
      {
        color: 'red',
        time: '',
        text: '',
      },
      {
        color: 'orange',
        time: '',
        text: '',
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

</style>
