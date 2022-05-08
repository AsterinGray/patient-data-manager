import api from '@/config/api'
import {
  CREATE_RECORD,
  DELETE_RECORD,
  EDIT_RECORD,
  GET_PATIENT_RECORD,
  GET_RECORD,
  GET_RECORD_BY_ID,
} from '@/constants/api-route'
import { RECORD } from '@/constants/slice'

import { BaseState, RecordResponse } from '@/types/connection'
import { Record } from '@/types/models'
import { createSlice } from '@reduxjs/toolkit'

import { AxiosResponse } from 'axios'
import { HYDRATE } from 'next-redux-wrapper'

import { AppDispatch, AppThunk } from '..'

const initialState: BaseState & RecordResponse = {
  records: [],
  record: {} as Record,
  status: 404,
}

const record = createSlice({
  name: RECORD,
  initialState,
  reducers: {
    setRecords(state, { payload }) {
      state.records = payload
    },
    setStatus(state, { payload }) {
      state.status = payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      return { ...state, ...payload }
    },
  },
})

export const getAllRecord = (updatedAt?: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      const res: AxiosResponse<RecordResponse, any> = await api.get(
        GET_RECORD,
        {
          params: { updatedAt },
        }
      )
      dispatch(record.actions.setStatus(res.status))
      dispatch(record.actions.setRecords(res.data.records))
    } catch {
      dispatch(record.actions.setStatus(500))
    }
  }

export const getPatientRecords = (id: any): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      const res: AxiosResponse<RecordResponse, any> = await api.get(
        GET_PATIENT_RECORD(id)
      )
      dispatch(record.actions.setStatus(res.status))
      dispatch(record.actions.setRecords(res.data.records))
    } catch {
      dispatch(record.actions.setStatus(500))
    }
  }

export const deleteRecord = (id: any): AppThunk =>
  async (dispatch: AppDispatch) => {
    try { 
      const res: AxiosResponse<RecordResponse, any> = await api.delete(
        DELETE_RECORD(id)
      )
      dispatch(record.actions.setStatus(res.status))
      dispatch(record.actions.setRecords(res.data.records))
    } catch {
      dispatch(record.actions.setStatus(500))
    }
  }

export const editRecord = (id: string, value: Record): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      await api.patch(EDIT_RECORD(id), { ...value })
    } catch {
      dispatch(record.actions.setStatus(500))
    }
  }

export const createRecord = (value: Record): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      await api.post(
        CREATE_RECORD,
        { ...value },
      )
    } catch {
      dispatch(record.actions.setStatus(500))
    }
  }

export const getRecordById = (id: any): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      await api.get(GET_RECORD_BY_ID(id))
    } catch {
      dispatch(record.actions.setStatus(500))
    }
  }

export default record.reducer
