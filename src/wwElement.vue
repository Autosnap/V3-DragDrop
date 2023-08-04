<template>
	<div>
		<div ref="el" :style="{ ...$attrs.style, ...layoutStyle }">
			<div
				v-for="(item, index) in componentValue"
				:key="getKey(item)"
				:[dataIdAttr]="getKey(item)"
				:[propName].prop="item"
			>
				<wwLayoutItemContext is-repeat :data="item" :item="null" :index="index">
					<wwElement v-bind="props.content.container" />
				</wwLayoutItemContext>
			</div>
		</div>
		<p v-if="!list.length && isEditing">Sortable - Empty List</p>
	</div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useSortable, updateArrayElement } from "./useSortable";

const props = defineProps({
	content: { type: Object, required: true },
	uid: { type: String, required: true },
	/* wwEditor:start */
	wwEditorState: { type: Object, required: true },
	/* wwEditor:end */
	wwFrontState: { type: Object, required: true },
});

const emit = defineEmits(["trigger-event"]);

const isEditing = computed(() => props.wwEditorState?.isEditing);

const el = ref(null);
const list = computed(
	() => wwLib.wwCollection.getCollectionData(props.content.data) || []
);

const { value: componentValue, setValue: setComponentValue } =
	wwLib.wwVariable.useComponentVariable({
		uid: props.uid,
		name: "value",
		type: "object",
		defaultValue: list.value,
	});

const initialOptions = makeOptions(props.content.options);

const propName = "customSortableListItem";

const dataIdAttr = computed(
	() => props.content.options.dataIdAttr || "data-id"
);

const handlers = [
	"onChoose",
	"onUnchoose",
	"onStart",
	"onEnd",
	"onFilter",
	"onClone",
	"onChange",
	"onSort",
].reduce((acc, name) => {
	acc[name] = async (sortableEvent) => {
		await nextTick();
		const data = {
			name,
			event: { sortableEvent, listItem: sortableEvent?.item[propName] },
		};
		if (props.content.useConsole) {
			console.log(data);
		}
		emit("trigger-event", data);
	};
	return acc;
}, {});

handlers.onMove = async (sortableEvent) => {
	await nextTick();
	const data = {
		name: "onMove",
		event: { sortableEvent, listItem: sortableEvent?.dragged[propName] },
	};
	if (props.content.useConsole) {
		console.log(data);
	}
	emit("trigger-event", data);
};

const updateHandlers = ["onAdd", "onRemove", "onUpdate"].reduce((acc, name) => {
	acc[name] = async (sortableEvent) => {
		const listItem = await updateArrayElement(
			list,
			el,
			propName,
			sortableEvent
		);
		await nextTick();
		setComponentValue(list.value);
		const data = {
			name,
			event: { sortableEvent, listItem, list: list.value },
		};
		if (props.content.useConsole) {
			console.log(data);
		}
		emit("trigger-event", data);
	};
	return acc;
}, {});

const { start, stop, option } = useSortable(el, list, {
	...initialOptions,
	...handlers,
	...updateHandlers,
	document: wwLib.getFrontDocument(),
});

watch(list, async (newValue, oldValue) => {
	if (newValue === oldValue) {
		return;
	}
	setComponentValue(newValue);
	emit("trigger-event", { name: "initialList", list: newValue });
});

watch(
	computed(() => props.content.options),
	(newValue) => {
		const options = makeOptions(newValue);
		for (const [key, value] of Object.entries(options)) {
			option(key, value);
		}
	},
	{ deep: true }
);

watch(
	isEditing,
	(value) => {
		if (value) {
			option("disabled", true);
		} else {
			option("disabled", props.content.options.disabled);
		}
	},
	{ immediate: true }
);

const layoutStyle = wwLib.useLayoutStyle();

defineExpose({ start, stop });

function getKey(item) {
	return wwLib.resolveObjectPropertyPath(item, props.content.idPath || "id");
}

function makeOptions(opt) {
	const { touchStartThreshold, draggable, ...options } = opt;
	if (touchStartThreshold !== -1) {
		options.touchStartThreshold = touchStartThreshold;
	}
	options.draggable = draggable || ">*";
	return options;
}
</script>

<style lang="scss" scoped></style>
