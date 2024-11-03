import { create } from 'zustand'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter.ts'

type Store = {
	filtersData: SearchRequestFilter
	setFiltersData: (filterItems: SearchRequestFilter) => void
}

const useFilterStore = create<Store>(set => ({
	filtersData: [],
	setFiltersData: (data: SearchRequestFilter) => set({ filtersData: data })
}))

export default useFilterStore
