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
	ModalOverlay
} from '@chakra-ui/react'

type FilterModalProps = {
	isOpen: boolean
	onClose: () => void
}

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
	const { t } = useTranslation()
	return (
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
	)
}

export default FilterModal
