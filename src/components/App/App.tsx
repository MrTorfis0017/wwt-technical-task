import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/query.ts'
import FilterModal from '@components/FilterModal/FilterModal.tsx'
import useFilterStore from '@store/store.tsx'

export const App = () => {
	const { t } = useTranslation()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { selectedFilters, setFiltersData } = useFilterStore()
	const { isLoading, error, data } = useQuery({
		queryKey: ['findFilters'],
		queryFn: () => fetch('/filterData.json').then(res => res.json())
	})
	useEffect(() => {
		if (data) {
			setFiltersData(data.filterItems)
		}
	}, [data])

	if (isLoading) {
		return <div>{t('Fetching')}</div>
	}
	if (error) {
		return (
			<div>
				{t('Error')} {error.message}
			</div>
		)
	}

	return (
		<QueryClientProvider client={queryClient}>
			<Box
				maxW="90rem"
				mx="auto"
				minH="100dvh"
			>
				<Button onClick={onOpen}>{t('Open')}</Button>
				<FilterModal
					isOpen={isOpen}
					onClose={onClose}
				/>
				{selectedFilters.map((item: string) => (
					<Text key={item}>{item}</Text>
				))}
			</Box>
		</QueryClientProvider>
	)
}
