import userData from 'userData';

const Privileges = {
    SUPERUSER: [1,2,3,4,5,6],
    BIRALHAT: [6],
    SZABIT_KIIRHAT: [5],
    ADATOT_MODOSITHAT: [1,2,3,4],
    ORAREND_FELELOS: [],
};
export const Actions = {
    MODIFY_USER: 1,
    DELETE_USER: 2,
    ADD_USER: 3,
    LIST_USERS: 4,
    MODIFY_OTHERS_HOLIDAY: 5,
    APPROVE_HOLIDAY: 6,
};
export function CanDo(action){
    if (userData.user.privileges.superuser) {
        for (let i = 0; i < Privileges.SUPERUSER.length; i++){
            if(Privileges.SUPERUSER[i] == action){ return true; }
        }
    }
    if (userData.user.privileges.biralhat) {
        for (let i = 0; i < Privileges.BIRALHAT.length; i++){
            if(Privileges.BIRALHAT[i] == action){ return true; }
        }
    }
    if (userData.user.privileges.szabit_kiirhat) {
        for (let i = 0; i < Privileges.SZABIT_KIIRHAT.length; i++){
            if(Privileges.SZABIT_KIIRHAT[i] == action){ return true; }
        }
    }
    if (userData.user.privileges.adatot_modosithat) {
        for (let i = 0; i < Privileges.ADATOT_MODOSITHAT.length; i++){
            if(Privileges.ADATOT_MODOSITHAT[i] == action){ return true; }
        }
    }
    if (userData.user.privileges.orarend_felelos) {
        for (let i = 0; i < Privileges.ORAREND_FELELOS.length; i++){
            if(Privileges.ORAREND_FELELOS[i] == action){ return true; }
        }
    }
    return false;
}