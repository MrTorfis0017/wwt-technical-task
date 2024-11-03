import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from '@chakra-ui/react'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter.ts'

import { queryClient } from '@/query.ts'

export const App = () => {
	const { t } = useTranslation()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [filterData, setFilterData] = useState<SearchRequestFilter[]>()
	const { isLoading, error, data } = useQuery({
		queryKey: ['findFilters'],
		queryFn: () => fetch('/filterData.json').then(res => res.json())
	})

	useEffect(() => {
		if (data) {
			setFilterData(data)
		}
	}, [data])

	console.log(filterData)

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
				<Modal
					isOpen={isOpen}
					onClose={onClose}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{t('Filters')}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Box></Box>
						</ModalBody>
						<ModalFooter>
							<Button variant="ghost">{t('Apply')}</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</QueryClientProvider>
	)
}
