import { Button } from "react-bootstrap";
import SettingsIcon from '../assets/settings.svg';

interface HeaderProps {
  showSettings: boolean;
  handleShowSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showSettings,
  handleShowSettings,
}) => {
  return (
    <header className='d-flex justify-content-end' style={{height: '100px'}}>
        <img className='settings-btn' src={SettingsIcon} width={50} onClick={() => handleShowSettings()}/>
    </header>
  );
};

export default Header;
