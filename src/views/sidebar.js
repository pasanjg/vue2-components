const Sidebar = {
	template: `
	<div class="list-group sidebar bg-light">
		<router-link to="/tabs" class="list-group-item list-group-item-action rounded-0">Tabs</router-link>
		<router-link to="/collapse" class="list-group-item list-group-item-action rounded-0">Collapse</router-link>
		<router-link to="/modal" class="list-group-item list-group-item-action rounded-0">Modal</router-link>
		<router-link to="/tags" class="list-group-item list-group-item-action rounded-0">Tags</router-link>
		<router-link to="/popover" class="list-group-item list-group-item-action rounded-0">Popover</router-link>
		<router-link to="/carousel" class="list-group-item list-group-item-action rounded-0">Carousel</router-link>
		<router-link to="/progress" class="list-group-item list-group-item-action rounded-0">Progress</router-link>
	</div>
	`,
};