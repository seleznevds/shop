import {LOADING_PROCESS_START, LOADING_PROCESS_COMPLETE} from './actionConstants';

export const loadingProcessStart = ({resourceType}) => {
    return {
        type: LOADING_PROCESS_START,
        payload: {
            resourceType
        }
    }
}

export const loadingProcessComplete = ({resourceType}) => {
    return {
        type: LOADING_PROCESS_COMPLETE,
        payload: {
            resourceType
        }
    }
}