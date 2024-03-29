export const Select2View = {
  data: function () {
    return {
      types: [
        { "value": "todos", "displayName": "Todos" },
        { "value": "users", "displayName": "Users" },
      ],
      choices: [],
      choiceDataDisplay: null,
      colors: [
        { "value": "red", "displayName": "Red" },
        { "value": "green", "displayName": "Green" },
        { "value": "purple", "displayName": "Purple" },
        { "value": "orange", "displayName": "Orange" },
        { "value": "black", "displayName": "Black" },
        { "value": "violet", "displayName": "Violet" },
        { "value": "blue", "displayName": "Blue" },
      ],
      colorsMulti: [
        { "value": "red", "displayName": "Red", "isSelected": true },
        { "value": "green", "displayName": "Green", "isSelected": true },
        { "value": "purple", "displayName": "Purple", "isSelected": false },
        { "value": "orange", "displayName": "Orange", "isSelected": false },
        { "value": "black", "displayName": "Black", "isSelected": false },
        { "value": "violet", "displayName": "Violet", "isSelected": false },
        { "value": "blue", "displayName": "Blue", "isSelected": false },
      ],
      colorsLocked: [
        { "value": "red", "displayName": "Red", "isSelected": true, "isLocked": true },
        { "value": "green", "displayName": "Green", "isLocked": true },
        { "value": "purple", "displayName": "Purple", "isLocked": false },
        { "value": "orange", "displayName": "Orange", "isLocked": false },
        { "value": "black", "displayName": "Black", "isLocked": false },
        { "value": "violet", "displayName": "Violet", "isLocked": false },
        { "value": "blue", "displayName": "Blue", "isLocked": false },
      ],
      pets: [
        { "value": "cat", "displayName": "Cat" },
        { "value": "dog", "displayName": "Dog" },
        { "value": "fish", "displayName": "Fish" },
        { "value": "bird", "displayName": "Bird" },
      ],
      cars: [
        { "value": "volvo", "displayName": "Volvo", "isLocked": true },
        { "value": "tesla", "displayName": "Tesla" },
        { "value": "bmw", "displayName": "BMW" },
        { "value": "benz", "displayName": "Benz" },
      ],

      selected: {},
      selected2: { "value": "cat", "displayName": "Cat" },
      selected3: { "value": "red", "displayName": "Red" },
      selected4: { "value": "volvo", "displayName": "Volvo" },

      selectedMulti: [],
      selectedMultiLocked: [],
      selectedMultiClear: [],

      type: {},
      choice: {},
      color: {},
    }
  },
  inject: ['fetcher'],
  methods: {
    getNewItem(item) {
      // Handle the added item
      console.debug('Added', item);
    },
    getRemovedItem(item) {
      // Hande removed item
      console.debug('Removed', item);
    },
    getAllRemovedItems(items) {
      // Hande all removed items
      this.cars = [];
      console.debug('All Removed', items);
    },
    async setChoiceList(type) {
      if (type['value'] === 'todos') {
        const url = "https://jsonplaceholder.typicode.com/todos"
        this.choiceDataDisplay = 'title'
        return await this.fetcher(url);

      } else if (type['value'] === 'users') {
        const url = "https://jsonplaceholder.typicode.com/users"
        this.choiceDataDisplay = 'name'
        return await this.fetcher(url);
      }
    }
  },
  watch: {
    async type(newValue, oldValue) {
      this.choice = {};
      this.choices = await this.setChoiceList(newValue);
    },
  },
  template:
    `
		<div class="mb-5">
			<h3>Select2</h3>
      <br />

      <h6>Demo</h6>
      <div class="row">
        <div class="col">
          <small><textarea class="code-snippet" rows="9" readonly>{{type}}</textarea></small>
        </div>
        <div class="col">
          <small><textarea class="code-snippet" rows="9" readonly>{{choice}}</textarea></small>
        </div>
        <div class="col">
          <small><textarea class="code-snippet" rows="9" readonly>{{color}}</textarea></small>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col">
          <fv-select2 id="demoTypes" :data-list="types" data-display="displayName" data-value="value" v-model="type" placeholder="Select type"/>
        </div>
        <div class="col">
          <fv-select2 id="demoChoice" :data-list="choices" :data-display="choiceDataDisplay" data-value="id" v-model="choice" placeholder="Select Choice"/>
        </div>
        <div class="col">
          <fv-select2 id="demoName" :data-list="colors" data-display="displayName" data-value="value" v-model="color" placeholder="Select Color"/>
        </div>
      </div>
      <br /> <hr /> <br />

      <h6>Basic usage</h6>
      <h6>
        <pre><code>&lt;fv-select2 id="demoSelect" :data-list="colors" data-display="displayName" data-value="value" v-model="selected" /&gt;</code></pre>
      </h6>
      <textarea class="code-snippet" rows="9" readonly>
      colors: [
        { "value": "red", "displayName": "Red" },
        { "value": "green", "displayName": "Green" },
        { "value": "purple", "displayName": "Purple" },
        { "value": "orange", "displayName": "Orange" },
        { "value": "black", "displayName": "Black" },
        { "value": "violet", "displayName": "Violet" },
        { "value": "blue", "displayName": "Blue" },
      ],</textarea> <br /> <br />
      <small>selected: {{selected}}</small> <br /> <br />
			<fv-select2 id="demoSelect" :data-list="colors" data-display="displayName" data-value="value" v-model="selected" placeholder="Select color"/>
      <br /> <hr /> <br />

      <h6>Add a new value to the list</h6>
      <h6><code>@onAdd="getNewItem"</code></h6>
      <textarea class="code-snippet" rows="4" readonly>
      getNewItem(item) {
        // Handle the added item
        console.debug('Added', item);
      },</textarea> <br /> <br />
      <small>selected: {{selected2}}</small> <br /> <br />
			<fv-select2 id="demoSelect2" :data-list="pets" data-display="displayName" data-value="value" v-model="selected2" @onAdd="getNewItem" placeholder="Select"/>
      <br /> <hr /> <br />

      <h6>Remove a value from the list</h6>
      <h6><code> @onRemove="getRemovedItem"</code></h6>
      <textarea class="code-snippet" rows="4" readonly>
      getRemovedItem(item) {
        // Handle removed item
        console.debug('Removed', item);
      },</textarea> <br /> <br />
      <small>selected: {{selected3}}</small> <br /> <br />
			<fv-select2 id="demoSelect3" :data-list="colors" data-display="displayName" data-value="value" v-model="selected3" @onRemove="getRemovedItem" @onRemoveAll="getAllRemovedItems" placeholder="Select color"/>
      <br /> <hr /> <br />

      <h6>Remove all values from the list</h6>
      <h6><code>@onRemoveAll="getAllRemovedItems"</code></h6>
      <textarea class="code-snippet" rows="4" readonly>
      getAllRemovedItems(items) {
        // Handle all removed items
        console.debug('All Removed', items);
      },</textarea> <br /> <br />
      <small>selected: {{selected4}}</small> <br /> <br />
			<fv-select2 id="demoSelect4" :data-list="cars" data-display="displayName" data-value="value" locked-key="isLocked" v-model="selected4" @onRemove="getRemovedItem" @onRemoveAll="getAllRemovedItems" placeholder="Select color"/>
      <br /> <hr /> <br />

      <h6>Multiselect</h6>
      <h6><code>:data-list="colorsMulti" multi-select="true" multi-select-key="isSelected"</code></h6>
      <textarea class="code-snippet" rows="9" readonly>
      colorsMulti: [
        { "value": "red", "displayName": "Red", "isSelected": true },
        { "value": "green", "displayName": "Green", "isSelected": true },
        { "value": "purple", "displayName": "Purple", "isSelected": false },
        { "value": "orange", "displayName": "Orange", "isSelected": false },
        { "value": "black", "displayName": "Black", "isSelected": true },
        { "value": "violet", "displayName": "Violet", "isSelected": false },
        { "value": "blue", "displayName": "Blue", "isSelected": false },
      ],</textarea> <br /> <br />
      <small>selected: {{selectedMulti}}</small> <br /> <br />
      <small>{{selectedMulti.length}} items selected</small> <br /> <br />
			<fv-select2 id="demoMulti" multi-select="true" multi-select-key="isSelected" :data-list="colorsMulti" data-display="displayName" data-value="value" v-model="selectedMulti" @onAdd="getNewItem" @onRemove="getRemovedItem" @onRemoveAll="getAllRemovedItems" placeholder="Select color"/>
      <br /> <hr /> <br />

      <h6>Locked Fields</h6>
      <h6><code>:data-list="colorsLocked" locked-key="isLocked"</code></h6>
      <textarea class="code-snippet" rows="9" readonly>
      colorsLocked: [
        { "value": "red", "displayName": "Red", "isSelected": true, "isLocked": true },
        { "value": "green", "displayName": "Green", "isSelected": true, "isLocked": true },
        { "value": "purple", "displayName": "Purple", "isSelected": false, "isLocked": false },
        { "value": "orange", "displayName": "Orange", "isSelected": false, "isLocked": false },
        { "value": "black", "displayName": "Black", "isSelected": false, "isLocked": true },
        { "value": "violet", "displayName": "Violet", "isSelected": false, "isLocked": false },
        { "value": "blue", "displayName": "Blue", "isSelected": false, "isLocked": false },
      ],</textarea> <br /> <br />
      <small>selected: {{selectedMultiLocked}}</small> <br /> <br />
      <small>{{selectedMultiLocked.length}} items selected</small> <br /> <br />
			<fv-select2 id="demoLocked" :data-list="colorsLocked" multi-select="true" multi-select-key="isSelected" locked-key="isLocked" data-display="displayName" data-value="value" v-model="selectedMultiLocked" @onAdd="getNewItem" @onRemove="getRemovedItem" @onRemoveAll="getAllRemovedItems" placeholder="Select color"/>
      <br /> <hr /> <br />

      <h6>Clear Selection</h6>
      <h6><code>:allow-clear="true"</code></h6>
      <textarea class="code-snippet" rows="9" readonly>
      colorsLocked: [
        { "value": "red", "displayName": "Red", "isSelected": true, "isLocked": true },
        { "value": "green", "displayName": "Green", "isSelected": true, "isLocked": true },
        { "value": "purple", "displayName": "Purple", "isSelected": false, "isLocked": false },
        { "value": "orange", "displayName": "Orange", "isSelected": false, "isLocked": false },
        { "value": "black", "displayName": "Black", "isSelected": false, "isLocked": true },
        { "value": "violet", "displayName": "Violet", "isSelected": false, "isLocked": false },
        { "value": "blue", "displayName": "Blue", "isSelected": false, "isLocked": false },
      ],</textarea> <br /> <br />
      <small>selected: {{selectedMultiClear}}</small> <br /> <br />
      <small>{{selectedMultiClear.length}} items selected</small> <br /> <br />
			<fv-select2 id="demoClear" :data-list="colorsLocked" multi-select="true" multi-select-key="isSelected" locked-key="isLocked" :allow-clear="true" data-display="displayName" data-value="value" v-model="selectedMultiClear" @onAdd="getNewItem" @onRemove="getRemovedItem" @onRemoveAll="getAllRemovedItems" placeholder="Select color"/>
      <br /> <hr /> <br />

      <h6>Placeholders</h6> <br />
      <div class="row">
        <div class="col-md-6">
          <h6>Select placeholder</h6>
          <h6><code>placeholder="Select your favourite color"</code></h6>
          <fv-select2 id="demoSelect5" :data-list="colors" data-display="displayName" data-value="value" v-model="selected" placeholder="Select your favourite color"/>
        </div>
        <div class="col-md-6">
          <h6>Filter placeholder</h6>
          <h6><code>filter-placeholder="Filter your color"</code></h6>
          <fv-select2 id="demoSelect6" :data-list="colors" data-display="displayName" data-value="value" v-model="selected" filter-placeholder="Filter your color"/>
        </div>
      </div>
		</div>
  `,
};
