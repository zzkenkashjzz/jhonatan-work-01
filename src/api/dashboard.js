import api from "./api";

const prefix = 'dashboard';

export default {
    search: function (filter) {
        return api.put(`${prefix}`, filter);
    }
};