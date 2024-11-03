import { FilterType } from '../Filter'

export interface SearchRequestFilterBase {
	id: string
	type: FilterType
}

export interface SearchRequestOptions extends SearchRequestFilterBase {
	id: string
	name: string
	type: FilterType.OPTION
	options: {
		id: string
		name: string
		description: string
	}[]
}

export type SearchRequestFilter = SearchRequestOptions[]
