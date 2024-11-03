import { create } from 'zustand'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter.ts'

type Store = {
	filtersData: SearchRequestFilter
	setSelectedFilters: (filterIds: string[]) => void
	setFiltersData: (filterItems: SearchRequestFilter) => void
	selectedFilters: string[]
}

const useFilterStore = create<Store>(set => ({
	filtersData: [],
	selectedFilters: [],
	setSelectedFilters: (filterIds: string[]) =>
		set({ selectedFilters: filterIds }),
	setFiltersData: (filterItems: SearchRequestFilter) =>
		set({ filtersData: filterItems })
}))

export default useFilterStore
