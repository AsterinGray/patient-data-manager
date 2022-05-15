import { AppDispatch } from '@/store/index'
import { deleteRecord } from '@/store/slices/record'

import { Record } from '@/types/models'
import { NextRouter } from 'next/dist/client/router'

import { Button, Data } from './style'

const RecordData = (
  record: Record,
  route: NextRouter,
  dispatch: AppDispatch,
  patientId: any
) => {
  const onDelete = () => {
    dispatch(deleteRecord(record._id))
  }

  const onEdit = () => {
    route.replace(`/patient/${patientId}/form?record=${record._id}`)
  }

  return (
    <>
      <Data>{record.createdAt.slice(0, 10)}</Data>
      <Data>{record.symptoms}</Data>
      <Data>{record.treatment}</Data>
      <Data>{record.medicine || '-'}</Data>
      <Data>{record.description || '-'}</Data>
      <Data>{record.honor || '-'}</Data>
      <Data>
        <Button onClick={() => onEdit()}>Edit</Button>
        <Button altBg={true} onClick={() => onDelete()}>
          Delete
        </Button>
      </Data>
    </>
  )
}

export default RecordData
