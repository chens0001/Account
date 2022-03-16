type RecordItem = {
	tags: string[]
	notes: string
	type: string
	amount: string
	createdAt?: Date
}

type tag = {
	name: string,
	id: string
}

interface window {
	tagList: tag []
	createTag: (name: string) => void
	updateTag: (id: string, name: string) => Tag
}


type tagListModel = {
	data: tag[]
	save: () => void
	fetch: () => tag[]
	create: (tag: string) => 'success' | 'duplicated'
	update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
	remove: (id: string) => boolean
}