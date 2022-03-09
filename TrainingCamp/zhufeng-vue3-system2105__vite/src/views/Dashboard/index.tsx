import { defineComponent, getCurrentInstance } from 'vue';
import './index.scss';

const Dashboard = defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()!;

    const sayHi = () => {
      proxy?.$message.success('哈哈哈');
    };

    console.log(import.meta.env);

    return () => (
      <>
        <h1 onClick={sayHi}>Dashboard page</h1>
        <svg-icon icon-class="bug"></svg-icon>
        <svg-icon icon-class="404" class-name="custom-class" onClick={sayHi}></svg-icon>
      </>
    );
  },
});

export default Dashboard;
