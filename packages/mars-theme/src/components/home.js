import Page from "./page";
import { connect, styled } from "frontity";

const Home = ({}) => {

return (
    <Container> 
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

    .particle-header {
        height: 60vh;
    }

    .particle-header video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
    }

    .particle-header .wp-block-cover__inner-container {
        top: 20vh;
        position: absolute;
        color: white;
        width: 100%;
        -webkit-box-pack: center;
        justify-content: center;
        display: flex;
    }

    @media only screen and (max-width: 500px) {
        .particle-header .wp-block-cover__inner-container {
            top: 12.5vh;
        }
    }

    .particle-header h2 {
        font-size: 2rem;
    }

    .particle-header p {
        font-size: 1.325rem;
        max-width: 800px;
    }

    @media only screen and (max-width: 500px) {
        .particle-header p {
        font-size: 1.125rem;
        }
    }

`;

