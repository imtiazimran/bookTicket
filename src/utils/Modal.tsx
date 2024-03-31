
'use client'
import { CloudArrowUp } from 'phosphor-react'
import { Button, Modal, Typography } from 'keep-react'

export const ModalComponent = ({isOpen, setIsOpen, children} : {isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, children: React.ReactNode}) => {
  
  
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Body className="space-y-3">
          <Modal.Icon>
            <CloudArrowUp size={28} color="#1B4DFF" />
          </Modal.Icon>
          <Modal.Content>
            <Typography variant="div" className="!mb-6">
              <Typography variant="h3" className="mb-2 text-body-1 font-medium text-metal-900">
                Add New Coach
              </Typography>
              <Typography variant="p" className="text-body-4 font-normal text-metal-600">
                {children}
              </Typography>
            </Typography>
          </Modal.Content>

          <Modal.Footer>
            <Button onClick={closeModal} size="sm" variant="outline" color="secondary">
              Cancel
            </Button>
            <Button onClick={closeModal} size="sm" color="primary">
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}
