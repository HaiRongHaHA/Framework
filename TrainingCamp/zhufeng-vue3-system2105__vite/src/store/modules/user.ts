import { Module } from 'vuex';
import { RootStateTypes, UserStateTypes } from '@/store/interface';

const user: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    name: '海容',
    phone: 1825468745594,
  },
  mutations: {
    SET_NAME(state, payload) {
      state.name = payload;
    },
  },
  actions: {
    getInfo({ commit }) {
      console.log('zhix');

      setTimeout(() => {
        commit('SET_NAME', '我修改海容名字');
      }, 3000);
    },
  },
  getters: {
    namePhone(state) {
      return state.name + state.phone;
    },
  },
};
export default user;
