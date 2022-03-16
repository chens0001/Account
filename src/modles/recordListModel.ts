import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordListModel = {
	recordList: [] as RecordItem[],
	clone(data: RecordItem[] | RecordItem) {
		return JSON.parse(JSON.stringify(data));
	},
	fetch() {
		this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
		return this.recordList;
	},
	save(data: RecordItem[]) {
		window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
	},
	createRecord(record: RecordItem) {
		const record2: RecordItem = clone(record);
		record2.createdAt = new Date();
		this.recordList && this.recordList.push(record2);
	}
}
export default recordListModel;