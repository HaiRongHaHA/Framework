import { defineComponent } from 'vue';
import './index.scss';
import Sidebar from '@/components/Sidebar/index';

const Home = defineComponent({
  setup() {
    return () => (
      <div class="app-wrapper">
        <div class="sidebar-container">
          <Sidebar />
        </div>
        <div class="main-container">
          <div class="header">
            <div class="navbar">navbar</div>
            <div class="tags-view">tagsview</div>
          </div>
          <div class="app-main">
            <h2>app main</h2>
            <router-view></router-view>
          </div>
        </div>
      </div>
    );
  },
});

export default Home;
