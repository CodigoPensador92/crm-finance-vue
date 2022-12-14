import firebase from "firebase/app"

export default {
    actions: {
        async createRecord({dispatch, commit}, record){
            try {
                const uid = await dispatch('getUserId')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)

            } catch(e){
                commit('SetError', e)
                throw e
            }
        },
        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUserId')
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
                
                return Object.keys(records).map(key =>({...records[key], id: key}) )

            } catch(e) {
                commit('SetError', e)
                throw e
            }
        },
        async fetchRecordById({dispatch, commit}, id) {
            try {
                const uid = await dispatch('getUserId')
                const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
                
                return {...record, id}

            } catch(e) {
                commit('SetError', e)
                throw e
            }
        }
    }
}