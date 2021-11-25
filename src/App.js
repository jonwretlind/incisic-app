import logo from './img/cropped-RGB_Incisic_Final.png';
import './App.css';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/PersonOutline';
import AppWindow from './AppWindow';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="col1">
          <HomeIcon />
          <UserIcon />
        </div>
        <div className="col2">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Financial Well-Being Through Sound Instruction
          </p>
        </div>
      </header>
      <AppWindow />
    </div>
  );
}
export default App;
