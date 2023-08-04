/*! license MIT - Copyright (c) 2019-PRESENT Anthony Fu<https://github.com/antfu> */

import {
	defaultDocument,
	toValue,
	tryOnMounted,
	tryOnScopeDispose,
	unrefElement,
} from "@vueuse/core";
import Sortable from "./sortable";
import { nextTick } from "vue-demi";

export function useSortable(el, list, options = {}) {
	let sortable;

	const { document = defaultDocument, ...resetOptions } = options;

	const defaultOptions = {
		onUpdate: (e) => {
			moveArrayElement(list, e.oldIndex, e.newIndex);
		},
	};

	const start = () => {
		const target =
			typeof el === "string" ? document?.querySelector(el) : unrefElement(el);
		if (!target) return;
		sortable = new Sortable(target, { ...defaultOptions, ...resetOptions });
	};

	const stop = () => sortable?.destroy();

	const option = (name, value) => {
		if (value !== undefined) {
			sortable?.option(name, value);
			resetOptions[name] = value;
		} else return sortable?.option(name);
	};

	tryOnMounted(start);

	tryOnScopeDispose(stop);

	return { stop, start, option };
}

export function moveArrayElement(list, from, to) {
	const array = toValue(list);
	if (to >= 0 && to < array.length) {
		const element = array.splice(from, 1)[0];
		nextTick(() => array.splice(to, 0, element));
	}
}

export async function updateArrayElement(list, elementRef, propName, event) {
	const array = toValue(list);
	const to = event.newIndex;
	const from = event.oldIndex;
	if (event.from === event.to) {
		// update
		if (to >= 0 && to < array.length) {
			const element = array.splice(from, 1)[0];
			await nextTick();
			array.splice(to, 0, element);
			return element;
		}
	} else {
		if (event.to === elementRef.value) {
			// add
			const element = event.item[propName];
			array.splice(to, 0, element);
			return element;
		} else {
			// remove
			return array.splice(from, 1)[0];
		}
	}
}
