Vue.component('fv-rating', {
  props: ['contentclass'],
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked Rating {{ count }} times.</button>'
});