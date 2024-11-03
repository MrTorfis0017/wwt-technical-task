import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text
} from '@chakra-ui/react'

import { SearchRequestOptions } from '@api/types/SearchRequest/SearchRequestFilter.ts'

import useFilterStore from '@store/store.tsx'

type FilterModalProps = {
	isOpen: boolean
	onClose: () => void
}

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
	const { t } = useTranslation()
	const filterData = useFilterStore(state => state.filtersData)
	console.log(filterData)
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{t('Filter')}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{filterData.map((filterItem: SearchRequestOptions) => (
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
									<Checkbox key={filterOptionItem.id}>
										{filterOptionItem.name}
									</Checkbox>
								))}
							</SimpleGrid>
						</Box>
					))}
				</ModalBody>
				<ModalFooter>
					<Button variant="ghost">{t('Apply')}</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default FilterModal
