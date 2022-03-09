import { Module } from 'vuex';
import { RootStateTypes, TestStateTypes } from '@/store/interface';

const test: Module<TestStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    mid: 111,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
};
export default test;
