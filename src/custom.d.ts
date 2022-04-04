type RecordItem = {
	tags: tag[]
	notes: string
	type: string
	amount: string
	createdAt?: string
}

type tag = {
	name: string,
	id: string
}

type tagListModel = {
	data: tag[]
	save: () => void
	fetch: () => tag[]
	create: (tag: string) => 'success' | 'duplicated'
	update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
	remove: (id: string) => boolean
}