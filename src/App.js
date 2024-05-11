import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from './components/Top';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Menu from './components/Menu';

function App() {
    return (
        <Container >
            <Top />
            <Menu />
            <Footer />
        </Container>
    );
}

export default App;
