import options from "./src/options";

const eventObject = {
	sortableEvent: {
		item: {},
		to: {},
		from: {},
		oldIndex: 0,
		newIndex: 0,
		oldDraggableIndex: 0,
		newDraggableIndex: 0,
		clone: {},
		pullMode: "",
		originalEvent: {},
	},
	listItem: {},
};

const updateEventObject = {
	...eventObject,
	list: [],
};

const domRect = { left: 0, top: 0, right: 0, bottom: 0 };

const moveEventObject = {
	sortableEvent: {
		dragged: {},
		to: {},
		from: {},
		draggedRect: domRect,
		related: {},
		relatedRect: domRect,
		willInsertAfter: true,
		originalEvent: { clientY: 0 },
	},
	listItem: {},
};

export default {
	options: {
		layout: ["flex"],
	},
	inherit: {
		type: "ww-layout",
	},
	editor: {
		label: {
			en: "Custom Sortable",
			icon: "border",
			bubble: {
				icon: "border",
			},
			// customStylePropertiesOrder:[],
			// customSettingsPropertiesOrder:[]
		},
	},
	triggerEvents: [
		{
			name: "onChoose",
			label: {
				en: "On Choose",
			},
			event: eventObject,
		},
		{
			name: "onUnchoose",
			label: {
				en: "On Unchoose",
			},
			event: eventObject,
		},
		{
			name: "onStart",
			label: {
				en: "On Start",
			},
			event: eventObject,
		},
		{
			name: "onEnd",
			label: {
				en: "On End",
			},
			event: eventObject,
		},
		{
			name: "onAdd",
			label: {
				en: "On Add",
			},
			event: updateEventObject,
		},
		{
			name: "onUpdate",
			label: {
				en: "On Update",
			},
			event: updateEventObject,
		},
		{
			name: "onSort",
			label: {
				en: "On Sort",
			},
			event: eventObject,
		},
		{
			name: "onRemove",
			label: {
				en: "On Remove",
			},
			event: updateEventObject,
		},
		{
			name: "onFilter",
			label: {
				en: "On Filter",
			},
			event: eventObject,
		},
		{
			name: "onMove",
			label: {
				en: "On Move",
			},
			event: moveEventObject,
		},
		{
			name: "onClone",
			label: {
				en: "On Clone",
			},
			event: eventObject,
		},
		{
			name: "onChange",
			label: {
				en: "On Change",
			},
			event: eventObject,
		},
		{
			name: "initialList",
			label: {
				en: "On initial list change",
			},
			event: { list: [] },
		},
	],
	actions: [
		{ label: "start", action: "start", args: [] },
		{ label: "stop", action: "stop", args: [] },
	],
	properties: {
		data: {
			bindable: true,
			section: "settings",
			label: "Items",
			type: "Info",
			options: {
				text: { en: "Elements to repeat" },
			},
		},
		idPath: {
			label: {
				en: "Unique id",
			},
			type: "ObjectPropertyPath",
			options(content) {
				const data = content.data?.data || content.data;
				let object = data;
				if (Array.isArray(data)) {
					object = data[0];
				}
				return { object: object || {} };
			},
			hidden(content) {
				const data = content.data?.data || content.data;
				if (Array.isArray(data)) {
					return !data.length;
				}
				return true;
			},
			section: "settings",
			defaultValue: "['id']",
		},
		fullOptions: {
			label: { en: "Show full options" },
			type: "OnOff",
			defaultValue: false,
			editorOnly: true,
			section: "settings",
		},
		options,
		useConsole: {
			label: { en: "Use console" },
			type: "OnOff",
			defaultValue: false,
			bindable: true,
			section: "settings",
		},
		container: {
			hidden: true,
			defaultValue: {
				isWwObject: true,
				type: "ww-flexbox",
			},
			state: {
				name: "Item container",
			},
		},
	},
};
