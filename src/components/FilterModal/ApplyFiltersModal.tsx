import { useTranslation } from 'react-i18next'

import {
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack
} from '@chakra-ui/react'

type ApplyFiltersModalProps = {
	isOpen: boolean
	closeFirstModal: () => void
	selectedFiltersState: string[]
	setSelectedFilters: (selectedFilters: string[]) => void
	setIsOpen: (isOpen: boolean) => void
}
const ApplyFiltersModal = ({
	closeFirstModal,
	selectedFiltersState,
	setSelectedFilters,
	isOpen,
	setIsOpen
}: ApplyFiltersModalProps) => {
	const { t } = useTranslation()

	const handleApplyFilters = () => {
		setIsOpen(!isOpen)
		setSelectedFilters(selectedFiltersState)
		closeFirstModal()
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => setIsOpen(!isOpen)}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader borderBottom="none">
					{t('Do you want to apply new filter ?')}
				</ModalHeader>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
				>
					<Button onClick={() => setIsOpen(!isOpen)}>
						{t('Use old filter')}
					</Button>
					<Button
						onClick={handleApplyFilters}
						backgroundColor={'#FF5F00'}
					>
						{t('Apply new filter')}
					</Button>
				</Stack>
			</ModalContent>
		</Modal>
	)
}

export default ApplyFiltersModal
