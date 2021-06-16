import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";

const Header = ({ state }) => {
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title><img src="https://smart-buildings.tempurl.host/wp-content/uploads/2021/06/logo.png"></img></Title>
        </StyledLink>
        <Nav />
      </Container>
      <MobileMenu />
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 24px;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0px 12.5vw;
`;

const Title = styled.div`
  margin: 0;

  img {
    max-height: 50px;
  }
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledLink = styled(Link)`
  text-decoration: none;

`;
