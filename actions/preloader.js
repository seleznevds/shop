import {LOADING_PROCESS_START, LOADING_PROCESS_COMPLETE} from './actionConstants';

export const loadingProcessStart = (data) => {
    return {
        type: LOADING_PROCESS_START,
        payload: {
            ...data
        }
    }
}

export const loadingProcessComplete = (data) => {
    return {
        type: LOADING_PROCESS_COMPLETE,
        payload: {
            ...data
        }
    }
}