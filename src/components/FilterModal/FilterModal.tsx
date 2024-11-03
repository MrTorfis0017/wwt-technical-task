import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Checkbox,
	Divider,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Stack,
	Text
} from '@chakra-ui/react'

import { SearchRequestOptions } from '@api/types/SearchRequest/SearchRequestFilter.ts'

import ApplyFiltersModal from '@components/FilterModal/ApplyFiltersModal.tsx'
import useFilterStore from '@store/store.tsx'

type FilterModalProps = {
	isOpen: boolean
	onClose: () => void
}

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
	const { t } = useTranslation()
	const { filtersData, selectedFilters, setSelectedFilters } = useFilterStore()
	const [selectedFiltersState, setSelectedFiltersState] = useState<string[]>([])
	const [isOpenApplyModal, setIsOpenApplyModal] = useState<boolean>(false)
	useEffect(() => {
		if (isOpen) {
			setSelectedFiltersState(selectedFilters)
		}
	}, [isOpen, selectedFilters])

	const handleChooseFilter = (id: string) => {
		setSelectedFiltersState(prevState => {
			if (prevState.includes(id)) {
				return prevState.filter(filterId => filterId !== id)
			} else {
				return [...prevState, id]
			}
		})
	}

	const handleApplyFilters = () => {
		setIsOpenApplyModal(!isOpenApplyModal)
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader borderBottom="none">{t('Filter')}</ModalHeader>
					<Divider
						borderColor="gray.200"
						borderWidth="2px"
					/>
					<ModalCloseButton />
					<ModalBody>
						{filtersData.map((filterItem: SearchRequestOptions) => (
							<Box key={filterItem.id}>
								<Text
									fontWeight="bold"
									sx={{ margin: '20px 0' }}
								>
									{filterItem.name}
								</Text>
								<SimpleGrid
									columns={[2, null, 3]}
									spacing={5}
								>
									{filterItem.options.map(filterOptionItem => (
										<Checkbox
											key={filterOptionItem.id}
											onChange={() => handleChooseFilter(filterOptionItem.id)}
											isChecked={selectedFiltersState.includes(
												filterOptionItem.id
											)}
										>
											{filterOptionItem.name}
										</Checkbox>
									))}
								</SimpleGrid>
								<Divider
									borderColor="gray.200"
									borderWidth="2px"
									margin="20px 0"
								/>
							</Box>
						))}
					</ModalBody>
					<Stack
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Button onClick={handleApplyFilters}>{t('Apply')}</Button>
					</Stack>
					<ModalFooter />
				</ModalContent>
			</Modal>
			<ApplyFiltersModal
				closeFirstModal={onClose}
				selectedFiltersState={selectedFiltersState}
				setSelectedFilters={setSelectedFilters}
				isOpen={isOpenApplyModal}
				setIsOpen={setIsOpenApplyModal}
			/>
		</>
	)
}

export default FilterModal
