import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  path: [],
  typeId: "",
  subTypeOptions: [],
  lastUpdated: null,
  expiryTime: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
}

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload
      state.lastUpdated = Date.now()
    },
    setTypeId: (state, action) => {
      state.typeId = action.payload
      state.lastUpdated = Date.now()
    },
    setSubTypeOptions: (state, action) => {
      state.subTypeOptions = action.payload
      state.lastUpdated = Date.now()
    },
    resetRoadmap: (state) => {
      state.path = []
      state.typeId = ""
      state.subTypeOptions = []
      state.lastUpdated = null
    },
    checkExpiry: (state) => {
      if (state.lastUpdated && Date.now() - state.lastUpdated > state.expiryTime) {
        state.path = []
        state.typeId = ""
        state.subTypeOptions = []
        state.lastUpdated = null
      }
    },
  },
})

export const { setPath, setTypeId, setSubTypeOptions, resetRoadmap, checkExpiry } = roadmapSlice.actions
export default roadmapSlice.reducer
