Vue.component('Popover', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked Popover {{ count }} times.</button>'
});