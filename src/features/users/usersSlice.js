import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id
})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: res => {
        const sortedUsers = res.sort((a, b) => b.id - a.id)
        return usersAdapter.setAll(initialState, sortedUsers)
      },
      providesTags: (result, error, arg) => [
        { type: 'User', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'User', id }))
      ]
    })
  })
})

export const { useGetUsersQuery } = usersApiSlice

export const selectUserResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(selectUserResult, usersResult => usersResult.data)

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  state => selectUsersData(state) ?? initialState
)
