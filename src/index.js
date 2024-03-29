import { FvTabs } from "./components/Tabs/tabs.js";
import { FvTab } from "./components/Tabs/tab.js";
import { FvTabContent } from "./components/Tabs/tabContent.js";
import { FvCollapse } from "./components/Collapse/collapse.js";
import { FvModal } from "./components/Modal/modal.js";
import { FvTag } from "./components/Tag/tag.js";
import { FvChip } from "./components/Tag/chip.js";
import { FvPopover } from "./components/Popover/popover.js";
import { FvCarousel } from "./components/Carousel/carousel.js";
import { FvProgress } from "./components/Progress/progress.js";
import { FvFeedback } from "./components/Feedback/feedback.js";
import { FvSelect2 } from './components/Select2/select2.js';
import { FvListbox } from "./components/Listbox/listbox.js";
import { ChartJS, chartTypes } from "./components/VueChartJS/vueChartjs.js";
import { FvCardCarousel } from "./components/CardCarousel/cardCarousel.js";
import { FvDataCards } from "./components/DataCards/dataCards.js";
import { FvFieldWrapper } from "./components/FieldWrapper/fieldWrapper.js";

import AutoClose from './directives/autoClose.js';
import Loading from './directives/loading.js';
import { vueTourWrapper } from "./components/VueTour/vueTourWrapper.js";

// Custom directives
Vue.use(AutoClose);
Vue.use(Loading);

// Fv components
Vue.component('fv-tabs', FvTabs);
Vue.component('fv-tab', FvTab);
Vue.component('fv-tab-content', FvTabContent);
Vue.component('fv-collapse', FvCollapse);
Vue.component('fv-modal', FvModal);
Vue.component('fv-tag', FvTag);
Vue.component('fv-chip', FvChip);
Vue.component('fv-popover', FvPopover);
Vue.component('fv-carousel', FvCarousel);
Vue.component('fv-progress', FvProgress);
Vue.component('fv-feedback', FvFeedback);
Vue.component('fv-select2', FvSelect2);
Vue.component('fv-listbox', FvListbox);
// ChartJS components
chartTypes.forEach(type => {
  Vue.component(type, ChartJS(type));
});
Vue.component('fv-card-carousel', FvCardCarousel);
Vue.component('fv-datacards', FvDataCards);
Vue.component('fv-fieldwrapper', FvFieldWrapper);
Vue.component('fv-tour', vueTourWrapper);
