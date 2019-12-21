import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/manual/store"
import { pagesSelector } from "@itsy.studio/manual/store/pages"

const name = "query"

const initialState = ""

const reducers = {
  search(query, action: PayloadAction<string>) {
    return action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const search = (query: string): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.search(query))
}

export const selectQuery = ({ query }) => query

export const selectResults = createSelector(
  [pagesSelector, selectQuery],
  (pages, query) => {
    if (query == "") {
      return []
    }

    const scoredPages = _.map(_.values(pages), (page) => {
      page.score = 0
      console.log(page.title)
      if (page.title === query) {
        page.score = Infinity
      } else if (page.title.startsWith(query)) {
        page.score = query.length * Math.pow(2, 8)
      } else if (page.title.includes(query)) {
        page.score = query.length * Math.pow(2, 7)
      } else if (page.description.includes(query)) {
        page.score = query.length * Math.pow(2, 1)
      }
      return page
    })

    const results = _.filter(scoredPages, (page) => {
      return page.score > 0 && page.path !== "/'"
    })

    _.sortBy(results, ["score"])

    return results
  }
)

export default slice
