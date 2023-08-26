import '../assets/App.css';
import Budget from './Budget';

const App = ()=> {
  return (
    <div className='max-w[1440px] w-[90%] mx-[auto] pt-10 flex justify-between items-start'>
      <Budget />
    </div>
  );
}

export default App;
