import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import logger from "redux-logger"
import { ThunkAction } from "redux-thunk"

import color from "./color"
import palette from "./palette"
import spritesheet, { importSpritesheet } from "./spritesheet"
import webview from "./webview"

const postMessageMiddleware = (store) => (next) => (action) => {
  next(action)

  if (!(window as any).ReactNativeWebView || action.__fromWebview) {
    if (action.type === "webview/start") {
      setTimeout(() => {
        store.dispatch(
          importSpritesheet(
            "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAGXklEQVR4Ae1dz2sbRxR+EnJPvYfQgwioUNcmhELTBmIbjC/GWRyTpIb4IFobV4dAKBjhi3uoDzFCEAo+NMJqq0MLSmuoUIIvIWA54KaFkIPT9uCLDyW4f0Jjoh5eOhp29sfsrvaHvN/HsszsvBmN3ve+710zZIMuGXZLjAy1w9ibNmSRgoQSkKE2Pz4ODbIXBFhnE5mCBYEAIATkYvztLhmy0Vl+N5mh617nJSgASJICnDVht5r8ooYCQIBkwQ4Fq67KX3isPjonD54FOWsfCLNG4yCAi1f+UfWL/l7X4AGwoAQq+tSYjIceYGe7A5GIAbpqdE0YGHgCdIp6oM0q57AWcWeGAjz4bJA+kYbWih6QSgK8SgGAApLdhH0bNwf76OHyRnX7qdRW1AqAQflUQJRk6JDkEDNYHEdHAGofTRgWFCG4h7vKTjMsTgK8Xo7/EsxnABQgU2VJklqeKrvqdrsY10IJEsYXcP1H6p9CD0iwAmK0DrXunCsxdiv3raRwFZChdhhJ4WNDOjxixGlBnjKoH6wZ6SNMJt70+C449IAE94C4bDFgsGakjzDLLXLJewqGAk61AkJtj56kE+Uf5I+ergcFnDoF+Kt9rhpPe0VwZIIIImu7vVBAKDzxE2cPCNXcQ20wESNOBeiXCXpAbAyBgMGGpaepvAYJC1gr8TdhSyNKjzudcgX4q1N0JgAAACCVGN7u8iNPHQJ0DpG/WD7OYZqHeL0SIxdvrgMG9DHGNUzzEE+RiSh2r1Ujf9QvPddKdD5HX5Q6VwKACBWg6cXOhh6eAuLsAc6O+ee1TMSHxPK/4iTAMjuW9/aaX98WHJwwr1eKkwC+k8N/dmVIjEOqdNcbOlxPc1cWrcirh/QXye0Bzkum+upXsnTO0SxtzSslVAF9sRSv5hZBGw/JKmFW3Wj8CgAAAAAAAAAAAABSjC4Zlm/AE7JIwUASgJKPmYAMtcVbUCJPAe1M+kJxftZuqdFsIa1x9gAHboB+Znl4uzu83bUcID/6yPneefH+VbsB0H8C1stbdks/frTI2f/tk19AQx96QGdvv7O3r2Z/whiZMEZ4IE8v3r/KSRcDIBQLqm9uEFEhb+y2X8hTUfhQQLgEFPKG5RQ9IAgyJvOxDOKSZ8PZbb+YMEb4zVO5B9x8Wle3Hx61iajRbMkfi/Oz8tS0mkYF2GXf1YJurF7no/LPrtPctMwTDxrNVnF+1pRxTvp6eWutsmRaTRUZfbAgIpr6doWIHn1WlYkRA9ecprb8iSirHzphjHBRizcPOPWcfc44J10MAA8KGH9S6Vwue7IgkwJUC3I2t47xZnV87FLaFTD+pMJvHnD6ON1qRctTWQH1zQ3mRgwWStXP//l4oVQdO3+uvrnBY/k9dv7cQqnq2oTS1QOEFITP2EIK2G2/EKyIwdtf/fz/+1j50vvOHKRNBy5N+PCoXSvtiOnk6Mnjg94WdVrIG6oF/TH1Ju9E9H3tnqBBBpNB9GuqFdC5XD6+e/vGh++YgpZnpmsPezQ4T0VvEIP3H53RucrNp/XxylLaCMj0sr+3T0THd2+f+eJrfnM2r7x6+Vdh+b3DGhE9GDrrPJWbhCwjT3dqNFvp6wV35hL0AAAAAAAAAAAAAEAC8eW71yzfgCfk1stbRLRWWUIuYkE2ePkD/cF6eYvV4M+CQIZPC7JkwtWUOnv7RDRFK+ItBuNjl5BWPwT0qw109vbBgR8CPPkPES2UqkT0wzcr6gBpDWRBmhCJVgeAPjKWDeDwqN1otuTvxflZuyMeH+RMCoAF+SdA5FomgL9woidHTx4f5PjN08Vbq6YTQIA+svqhyzPTyzPTnHR5ulCqcu2LARCKAuwABfSNAOdE21mQ3ANYEyYcHrVNjKq/ZVpNIwHO2SeiQt4Q2ZSn+Wc5ETM0N117uMMGJQZrlSXLwxvN1np5S11NFRm93LlCpF6dfvcWEdGn/5LoEPLANaepLX9vBNhZkEi9rAx5ADggay7GC+YvAssz02zxnHQxZQWwCIio9nCHzUcMAF0FcPb5XXz+Wt+CZAVYWhDg2YIaF7IqB5Y4+qCX6AIsKKAFqSjkDfG4TmFBgQgoPn/90+9/q0ETxoj+dHL0hM1HDAAHZHrZn58loiuvXj4YOstvsbR4a7W+uaEztbQdU/NwRaPZSh8Rd+YS9KQJ/wFvlSPxkbhmKgAAABB0RVh0TG9kZVBORwAyMDExMDIyMeNZtsEAAAAASUVORK5CYII=",
            "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA6JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj40PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIwLTAyLTE3VDIxOjExOjIzWjwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMjAtMDItMTdUMjE6MTY6MDZaPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPlBpeGVsbWF0b3IgUHJvIDEuNTwveG1wOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KMxNUJwAAAD9JREFUCB0BNADL/wEAAAAdK1Ni+gCBYv4Aq1M2X1dPwsPH//HoAP8BTf+jAP7/KQDnVwEqrf9Zyp18AAwAVgIuBxYB9xBQFwAAAABJRU5ErkJggg=="
          )
        )
      }, 100)
    }

    return
  }

  const message = JSON.stringify(action)
  ;(window as any).ReactNativeWebView.postMessage(message)

  if (action.type === "webview/start") {
    ;(window as any).store = store
  }
}

const middleware = [...getDefaultMiddleware(), logger, postMessageMiddleware]

const reducer = combineReducers({
  color: color.reducer,
  palette: palette.reducer,
  spritesheet: spritesheet.reducer,
  webview: webview.reducer,
})

const preloadedState = {}

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
})

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
