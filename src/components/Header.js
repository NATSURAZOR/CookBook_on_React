import { Navbar, Container, NavbarBrand } from 'reactstrap';

export function Header() {
  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/">Cookbook</NavbarBrand>
      </Container>
    </Navbar>
  );
}
