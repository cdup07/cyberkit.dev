import { Container, Row, Col } from 'react-bootstrap';


const Footer: React.FC = () => {
    return (
      <footer className="text-center py-3">
        <Container>
          <Row>
            <Col>by Luke Albertson and Carson Williams</Col>
          </Row>
        </Container>
      </footer>
    );
}
export default Footer;