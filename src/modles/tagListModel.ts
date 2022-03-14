
const localStorageKeyName = 'tagList';

type tag = {
	name: string,
	id: string
}

type tagListModel = {
	data: tag[]
	save: () => void
	fetch: () => tag[]
	create: (tag: tag) => 'success' | 'duplicated'
}

const tagListModel: tagListModel = {
	data: [],
	save() {
		window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
	},
	fetch() {
		this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
		return this.data;
	},
	create(tag) {
		const tagNames = this.data.map( item => item.name);
		if (tagNames?.includes(tag.name)) {return 'duplicated';}
		this.data.push(tag);
		this.save();
		return 'success';
	}
}
export default tagListModel;