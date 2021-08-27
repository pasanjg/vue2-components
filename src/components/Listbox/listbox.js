export const FvListbox = {
  model: {
    prop: 'value',
    event: 'onSelect'
  },
  props: {
    className: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
    dataList: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
    },
    dataSelected: {
      type: Object,
    },
    dataDisplay: {
      type: String,
      required: true,
    },
    dataValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select',
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
    multiSelectKey: {
      type: String,
    },
    maxHeight: {
      type: String,
      default: "12rem",
    },
  },
  data: function () {
    return {
      customInputValue: null,
      selectRef: `${this.id}SelectRef`,
      toggleButtonRef: `${this.id}ToggleButtonRef`,
      filterInputRef: `${this.id}FilterInputRef`,
      multiSelected: [],
    }
  },
  computed: {
    hasOnAddListener() {
      return this.$listeners && this.$listeners.onAdd
    },
    hasOnRemoveListener() {
      return this.$listeners && this.$listeners.onRemove
    },
    hasOnRemoveAllListener() {
      return this.$listeners && this.$listeners.onRemoveAll
    },
  },
  mounted: function () {
    this.initFunctions();
    this.getValue();
  },
  methods: {
    initFunctions: function () {
      const vm = this;
      const menu = document.querySelector(`[data-menu=${this.id}]`);

      const filterInput = menu.querySelector(`input[data-filter='${this.id}']`);
      const customField = document.getElementById(`${this.id}CustomField`);

      if (customField) customField.style.display = "none";

      if (vm.multiSelect || vm.multiSelect == "true") {
        vm.multiSelected = this.dataList.filter(item => item[this.multiSelectKey] === true);
      }

      this.renderList(this.dataList);
      this.filterList(filterInput);
    },
    getValue() {
      if (this.multiSelect || this.multiSelect == "true") {
        this.emitToVModel(this.multiSelected);
        return this.value = this.multiSelected.map(item => item[this.dataDisplay]).join(', ');
      } else {
        return this.value[this.dataDisplay];
      }
    },
    renderList: function (dataList) {
      const vm = this;
      const menuList = document.querySelector(`#${vm.id}MenuList`);
      menuList.innerHTML = "";

      for (let index in dataList) {
        const menuItem = document.createElement("div");
        const selectItem = document.createElement("div");

        menuItem.setAttribute("class", 'dropdown-item');
        menuItem.classList.add("d-flex", "justify-content-between", "align-items-center");
        menuItem.style.paddingTop = 0;
        menuItem.style.paddingBottom = 0;

        selectItem.setAttribute("class", 'w-100');
        selectItem.style.paddingTop = '0.25rem';
        selectItem.style.paddingBottom = '0.25rem';
        menuItem.style.cursor = 'pointer';
        selectItem.innerHTML = dataList[index][vm.dataDisplay];

        if (vm.multiSelect || vm.multiSelect == "true") {
          const checkbox = document.createElement("input");

          checkbox.setAttribute("id", `${vm.id + dataList[index][vm.dataValue]}CheckBox`);
          checkbox.setAttribute("class", 'mr-2');
          checkbox.setAttribute("type", 'checkbox');
          checkbox.setAttribute("value", dataList[index][vm.dataValue]);

          let currentItem = vm.dataList.find(element => element[vm.dataValue] == dataList[index][vm.dataValue]);

          if (currentItem && currentItem[vm.multiSelectKey]) {
            checkbox.checked = true;
          }
          else {
            checkbox.checked = false;
          }

          menuItem.appendChild(checkbox);
          checkbox.addEventListener("click", function (event) {
            vm.setAsSelected(dataList[index], event.target);
          });
        }

        if (vm.hasOnRemoveListener) {
          const removeBtn = document.createElement("i");
          removeBtn.classList.add("fa", "fa-times", "text-muted", "btn", "btn-light", "px-2", "mr-2");
          removeBtn.style.cursor = "pointer";
          menuItem.appendChild(removeBtn);

          removeBtn.addEventListener("click", function (e) {
            vm.removeFromList(vm.dataList[index]);
          });
        }

        menuItem.appendChild(selectItem);
        menuList.appendChild(menuItem);

        menuList.style.maxHeight = vm.maxHeight;
        menuList.style.overflowY = "auto";

        this.handleSelect(selectItem, dataList[index]);
      }
    },
    filterList: function (filterInput) {
      const vm = this;
      const customField = document.getElementById(`${vm.id}CustomField`);

      filterInput.addEventListener('input', function () {
        let filteredOptions = vm.dataList.filter(function (option) {
          option = option[vm.dataDisplay].toLowerCase();
          return option.indexOf(filterInput.value.toLowerCase()) > -1;
        });

        vm.renderList(filteredOptions);
        if (vm.hasOnAddListener) {
          if (filterInput.value != null && filterInput.value != "") {
            vm.customInputValue = filterInput.value;
            if (customField) customField.style.display = "block";
          } else {
            if (customField) customField.style.display = "none";
          }

          if (filteredOptions.length >= 1) {
            if (filteredOptions[0][vm.dataDisplay].toLowerCase() === filterInput.value.toLowerCase()) {
              if (customField) customField.style.display = "none";
            }
          }
        } else {
          if (customField) customField.style.display = "none";
        }
      });

      vm.handleCustomInput();
    },
    handleSelect: function (selectItem, selectedValue) {
      const vm = this;

      selectItem.addEventListener(('click'), function () {

        if (vm.multiSelect || vm.multiSelect == "true") {
          const checkbox = document.getElementById(`${vm.id + selectedValue[vm.dataValue]}CheckBox`);
          checkbox.checked = !checkbox.checked;

          vm.setAsSelected(selectedValue, checkbox);

        } else {
          vm.emitToVModel(selectedValue);
        }
      });
    },
    setAsSelected(selectedValue, checkbox) {
      const vm = this;
      const selectAllCheckbox = document.getElementById(`${vm.id}SelectAllCheckbox`);

      vm.dataList = vm.dataList.map(item => {
        if (item[vm.dataValue] === selectedValue[vm.dataValue]) {
          item[vm.multiSelectKey] = checkbox.checked;

          if (checkbox.checked) {
            vm.multiSelected.push(item);
            vm.emitToVModel(vm.multiSelected);
          } else {
            vm.multiSelected = vm.multiSelected.filter(item => item[vm.dataValue] != selectedValue[vm.dataValue]);
            vm.emitToVModel(vm.multiSelected);
          }
        }
        return item;
      });

      if (vm.dataList.length === vm.multiSelected.length) {
        selectAllCheckbox.checked = true;
      } else {
        selectAllCheckbox.checked = false;
      }
    },
    selectAll(event) {
      const vm = this;

      vm.clearFilterInput();

      vm.dataList.forEach(element => element[vm.multiSelectKey] = event.target.checked);
      if (event.target.checked) {
        vm.multiSelected = vm.dataList;
        vm.emitToVModel(vm.multiSelected);
      } else {
        vm.multiSelected = [];
        vm.emitToVModel(vm.multiSelected);
      }

      this.renderList(vm.dataList);
    },
    removeAll() {
      this.clearFilterInput();

      if (this.multiSelect || this.multiSelect == "true") {
        this.multiSelected = [];
      }

      this.emitToVModel([]);
      this.$emit('onRemoveAll', this.dataList);
      this.dataList = [];
      this.renderList(this.dataList);
    },
    handleCustomInput: function () {
      const vm = this;
      const customField = document.getElementById(`${vm.id}CustomField`);

      if (customField) {
        customField.addEventListener('click', function () {
          vm.addNewToList(vm.customInputValue);

          setTimeout(() => {
            customField.style.display = "none";
            vm.clearFilterInput();
            vm.renderList(vm.dataList);
          }, 100);
        });
      }
    },
    clearFilterInput() {
      const filterInput = document.querySelector(`input[data-filter='${this.id}']`);

      if (filterInput.value != null || filterInput.value != "") {
        filterInput.value = "";
      }
    },
    emitToVModel(value) {
      this.value = value;
      this.$emit('onSelect', this.value);
    },
    addNewToList(selectedValue) {
      this.$emit('onAdd', selectedValue);
    },
    removeFromList(selectedValue) {
      this.$emit('onRemove', selectedValue);
    },
    isSameList(list1, list2) {
      const vm = this;
      return list1.length === list2.length && list1.every(function (element, index) {
        return element[vm.dataValue] === list2[index][vm.dataValue];
      });
    },
  },
  watch: {
    dataList(newList, oldList) {
      if (!this.isSameList(newList, oldList)) {
        this.multiSelected = [];
        this.emitToVModel(this.multiSelected);
        this.renderList(newList);

        if (newList.length > 0) {
          const selectAllCheckbox = document.getElementById(`${this.id}SelectAllCheckbox`);
          if (selectAllCheckbox) selectAllCheckbox.checked = false;
        }
      }
    },
  },
  template:
    `
    <div class="input-group">
      <div :key="id" class="border rounded py-2 w-100" :data-menu="id">
        <span v-if="multiSelect && dataList.length != 0" class="btn btn-sm btn-light px-2 mb-2 ml-2">
          <input :id="id+'SelectAllCheckbox'" class="mr-2" type="checkbox" @click="selectAll($event)" />
          Select all
        </span>
        <span v-if="hasOnRemoveAllListener" class="btn btn-sm btn-danger float-right px-2 mr-2 mb-2" v-on:click="removeAll()">Remove all</span>
        <input type="search" :ref="filterInputRef" class="form-control shadow-none mx-auto mb-2" :data-filter="id" placeholder="Filter" style="width: 95%" />
        <span v-if="hasOnAddListener" :id="id+'CustomField'" class="dropdown-item">
          <i class="fa fa-plus text-muted"></i>
          <span>Add <strong>{{ customInputValue }}</strong> to list</span>
        </span>
        <div v-if="dataList.length === 0" class="dropdown-item">
          <i class="text-muted">No data</i>
        </div>
        <div :id="id+'MenuList'" class="w-100"></div>
      </div>
    </div>
  `,
};
