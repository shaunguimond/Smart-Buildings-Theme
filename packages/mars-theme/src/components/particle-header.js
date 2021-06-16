import { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import Particles from "reactparticles.js";


const ParticleHeader = () => {
    
    if (typeof window === "undefined") return null;
    
    return (
        <ParticleContainer>
            <Particles
                id="particle-home-header"
                config="particles/config-1.json"
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0b0c22",
                    opacity: "1",
                    position: "relative"
                }}
                className="particles-class-name"
            />
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

    @media only screen and (max-width: 980px) {
        height: calc(100vh - 74px);
    }
`;

const TextContainer = styled.div`
    max-width: 50vw;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 25%;
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

        h1 {
            font-size: 1.725rem;
        }
        p {
            font-size: 1.125rem;
        }
    }

    
`;