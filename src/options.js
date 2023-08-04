const hidden = (content, sidepanelContent) => {
	return !sidepanelContent.fullOptions;
};

export default {
	label: {
		en: "options",
	},
	type: "Object",
	bindable: true,
	section: "settings",
	defaultValue: {
		group: "group-name",
		sort: true,
		delay: 0,
		delayOnTouchOnly: false,
		touchStartThreshold: -1,
		disabled: false,
		animation: 0,
		easing: "",
		handle: "",
		filter: "",
		preventOnFilter: true,
		draggable: ">*", // !!!default >*
		dataIdAttr: "data-id", // !!!default data-id
		ghostClass: "sortable-ghost",
		chosenClass: "sortable-chosen",
		dragClass: "sortable-drag",
		swapThreshold: 1,
		invertSwap: false,
		invertedSwapThreshold: 1,
		direction: "horizontal",
		forceFallback: false,
		fallbackClass: "sortable-fallback",
		fallbackOnBody: false,
		fallbackTolerance: 0,
		dragoverBubble: false,
		removeCloneOnHide: true,
		emptyInsertThreshold: 5,
	},
	options: {
		item: {
			group: {
				label: {
					en: "group",
				},
				bindable: true,
				defaultValue: "group-name",
				type: "Text",
				options: {
					placeholder: "Group name for this list",
				},
			},
			sort: {
				label: {
					en: "sort",
				},
				bindable: true,
				defaultValue: true,
				type: "OnOff",
			},
			disabled: {
				label: {
					en: "disabled",
				},
				bindable: true,
				defaultValue: false,
				type: "OnOff",
			},
			direction: {
				label: {
					en: "direction",
				},
				bindable: true,
				defaultValue: "horizontal",
				type: "TextSelect",
				options: {
					options: [
						{ label: { en: "horizontal" }, value: "horizontal" },
						{ label: { en: "vertical" }, value: "vertical" },
					],
				},
			},
			animation: {
				label: {
					en: "animation",
				},
				bindable: true,
				defaultValue: 0,
				type: "Number",
				options: {
					min: 0,
					max: 600,
					step: 10,
				},
				hidden,
			},
			easing: {
				label: {
					en: "easing",
				},
				bindable: true,
				defaultValue: "",
				type: "Text",
				options: {
					placeholder: "Easing for animation",
				},
				hidden,
			},
			draggable: {
				label: {
					en: "draggable",
				},
				bindable: true,
				defaultValue: ">*",
				type: "Text",
				options: {
					placeholder: "Draggable element selector",
				},
				hidden,
			},
			handle: {
				label: {
					en: "handle",
				},
				bindable: true,
				defaultValue: "",
				type: "Text",
				options: {
					placeholder: "Drag handle selector",
				},
				hidden,
			},
			filter: {
				label: {
					en: "filter",
				},
				bindable: true,
				defaultValue: "",
				type: "Text",
				options: {
					placeholder: "Ignore dragging selector",
				},
				hidden,
			},
			preventOnFilter: {
				label: {
					en: "preventOnFilter",
				},
				bindable: true,
				defaultValue: true,
				type: "OnOff",
				hidden,
			},
			delay: {
				label: {
					en: "delay",
				},
				bindable: true,
				defaultValue: 0,
				type: "Number",
				options: {
					min: 0,
					max: 1000,
					step: 10,
				},
				hidden,
			},
			delayOnTouchOnly: {
				label: {
					en: "delayOnTouchOnly",
				},
				bindable: true,
				defaultValue: false,
				type: "OnOff",
				hidden,
			},
			touchStartThreshold: {
				label: {
					en: "touchStartThreshold",
				},
				bindable: true,
				defaultValue: 1,
				type: "Number",
				options: {
					min: -1,
					max: 10,
					step: 1,
				},
				hidden,
			},
			dataIdAttr: {
				label: {
					en: "dataIdAttr",
				},
				bindable: true,
				defaultValue: "data-id",
				type: "Text",
				options: {
					placeholder: "",
				},
				hidden,
			},
			ghostClass: {
				label: {
					en: "ghostClass",
				},
				bindable: true,
				defaultValue: "sortable-ghost",
				type: "Text",
				options: {
					placeholder: "Class for the drop placeholder",
				},
				hidden,
			},
			chosenClass: {
				label: {
					en: "chosenClass",
				},
				bindable: true,
				defaultValue: "sortable-chosen",
				type: "Text",
				options: {
					placeholder: "Class for chosen item",
				},
				hidden,
			},
			dragClass: {
				label: {
					en: "dragClass",
				},
				bindable: true,
				defaultValue: "sortable-drag",
				type: "Text",
				options: {
					placeholder: "Class for dragging item",
				},
				hidden,
			},
			swapThreshold: {
				label: {
					en: "swapThreshold",
				},
				bindable: true,
				defaultValue: 1,
				type: "Number",
				options: {
					min: 0,
					max: 1,
					step: 0.01,
				},
				hidden,
			},
			invertSwap: {
				label: {
					en: "invertSwap",
				},
				bindable: true,
				defaultValue: false,
				type: "OnOff",
				hidden,
			},
			invertedSwapThreshold: {
				label: {
					en: "invertedSwapThreshold",
				},
				bindable: true,
				defaultValue: 1,
				type: "Number",
				options: {
					min: 0,
					max: 10,
					step: 1,
				},
				hidden,
			},
			forceFallback: {
				label: {
					en: "forceFallback",
				},
				bindable: true,
				defaultValue: false,
				type: "OnOff",
				hidden,
			},
			fallbackClass: {
				label: {
					en: "fallbackClass",
				},
				bindable: true,
				defaultValue: "sortable-fallback",
				type: "Text",
				options: {
					placeholder: "Class for cloned element",
				},
				hidden,
			},
			fallbackOnBody: {
				label: {
					en: "fallbackOnBody",
				},
				bindable: true,
				defaultValue: false,
				type: "OnOff",
				hidden,
			},
			fallbackTolerance: {
				label: {
					en: "fallbackTolerance",
				},
				bindable: true,
				defaultValue: 0,
				type: "Number",
				options: {
					min: 0,
					max: 100,
					step: 1,
				},
				hidden,
			},
			dragoverBubble: {
				label: {
					en: "dragoverBubble",
				},
				bindable: true,
				defaultValue: false,
				type: "OnOff",
				hidden,
			},
			removeCloneOnHide: {
				label: {
					en: "removeCloneOnHide",
				},
				bindable: true,
				defaultValue: true,
				type: "OnOff",
				hidden,
			},
			emptyInsertThreshold: {
				label: {
					en: "emptyInsertThreshold",
				},
				bindable: true,
				defaultValue: 5,
				type: "Number",
				options: {
					min: 0,
					max: 50,
					step: 1,
				},
				hidden,
			},
		},
	},
};
