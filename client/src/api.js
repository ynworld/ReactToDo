import * as nodeAPI from './api-node'
import * as firebaseAPI from './api-firebase'

const api = process.env.REACT_APP_FIREBASE ? firebaseAPI : nodeAPI

const { get, put, post, del } = api

export { del, get, post, put }
