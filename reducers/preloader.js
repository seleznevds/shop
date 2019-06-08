import { LOADING_PROCESS_START, LOADING_PROCESS_COMPLETE } from '../actions/actionConstants';

let initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {


        case LOADING_PROCESS_START:
            if (action.payload.moduleName) {
                let preloader;
                let oldModulePreloader = state[action.payload.moduleName] || {};

                if (!action.payload.objectId) {
                    preloader = {
                        [action.payload.moduleName]: {
                            ...oldModulePreloader,
                            'main': true
                        }
                    }

                } else {
                    preloader = {
                        [action.payload.moduleName]: {
                            ...oldModulePreloader,
                            [action.payload.objectId]: true
                        }
                    }
                }
                return {
                    ...state,
                    ...preloader
                }
            }

            return state;

        case LOADING_PROCESS_COMPLETE:
            if (action.payload.moduleName) {
                let preloader;
                let oldModulePreloader = state[action.payload.moduleName] || {};

                if (!action.payload.objectId) {
                    preloader = {
                        [action.payload.moduleName]: {
                            ...oldModulePreloader,
                            'main': false
                        }
                    }

                } else {


                    preloader = {
                        [action.payload.moduleName]: {
                            ...oldModulePreloader,
                            [action.payload.objectId]: false
                        }
                    }
                }

                return {
                    ...state,
                    ...preloader
                }

            }
            return state;


        default:
            return state;
    }
}