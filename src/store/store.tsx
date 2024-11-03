import { create } from 'zustand'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter.ts'

type Store = {
	filtersData: SearchRequestFilter[]
	setFiltersData: (data: SearchRequestFilter[]) => void
}

const useFiltersStore = create<Store>(set => ({
	filtersData: [],
	setFiltersData: (data: SearchRequestFilter[]) =>
		set(state => ({
			filtersData: { ...state.filtersData, data }
		}))
}))

export default useFiltersStore
