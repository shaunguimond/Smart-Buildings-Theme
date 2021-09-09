import { connect, styled } from "frontity";
import Particles from 'react-particles-js';



const ParticleHeader = () => {
    
    return (
        <ParticleContainer>
            <Particles
            params={{
                "particles": {
                    "number": {
                        "value": 50
                    },
                    "size": {
                        "value": 3
                    }
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }} />
            <TextContainer>
                <h1>Build a new kind of Decentralized Building</h1>
                <p>At smart-buildings.io we're focused on building intelligence into building systems in a safe & secure manner. There are many advances taking place in the market with Digital Twins, Industry 4.0, IIoT, and Building Automation - it's time to secure critical infrastructure while bringing sustainability.</p>

            </TextContainer>
            
            
        </ParticleContainer>
        
    );

};

export default connect(ParticleHeader)


const ParticleContainer = styled.div`
    width: 100%;
    height: 60vh;

    #tsparticles {
        width: 100%;
        height: 60vh;
    }

    .tsparticles-canvas-el {
        background-color: #0b0c22;
    }

`;

const TextContainer = styled.div`
    max-width: 50vw;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20%;
    left: 25%;
    color: white;
    text-align: center;

    h1 {
        font-size: 2.725rem;
    }
    p {
        font-size: 1.325rem;
    }

    @media only screen and (max-width: 980px) {
        top: 25%;
        left: 12.5%;
        max-width: 75vw;

        h1 {
            font-size: 1.725rem;
        }
        p {
            font-size: 1.125rem;
        }
    }

    
`;