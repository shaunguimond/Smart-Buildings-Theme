import Page from "./page";
import ParticleHeader from "./particle-header";
import { connect, styled } from "frontity";

const Home = ({}) => {

return (
    <Container>
        <ParticleHeader /> 
        <Page/>
    </Container>
    
    );
};


export default connect(Home);

const Container = styled.div`
    width: 100%;
    
    .development-activity-text {
        max-width: 800px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }

`;

