import { connect, styled } from "frontity";


const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <Container>
            <GridContainer>
                <GridItem>
                    <h6>Quick Links</h6>
                    <ul>
                        <li><a href="/services">Services</a></li>
                        <li><a href="">Activity</a></li>
                        <li><a href="">Contact</a></li>
                        <li><a href="">Book a Meeting</a></li>

                    </ul>
                </GridItem>

                <GridItem>
                    <h6>Get in Touch</h6>
                    <ul>
                        <li><a href="tel:1-(844)-857-6278">p: 1-(844)-857-6278</a></li>
                        <li><a href="tel:(613)-800-7107">f: (613)-800-7107</a></li>
                        <li><a href="mailto:info@smart-buildings.io">e: info@smart-buildings.io</a></li>

                    </ul>
                    
                </GridItem>


            </GridContainer>
            
            <p>© { currentYear } Smart-Buildings.io built by <a href="https://parleedigital.ca" target="_blank">Parlee Digital</a></p>


        </Container>


    );


};

export default connect(Footer);

const Container = styled.div`
    background-color: rgb(11, 12, 34);
    margin-top: 32px;
    color: white;

    p {
        width: 100%;
        padding: 0px 0px 20px 0px;
        margin: 0px;
        text-align: center;
        font-size: 0.825em;
    }
`;

const GridContainer = styled.div`
    padding: 48px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
    width: calc(100% - 80px);
    justify-items: center;
`;

const GridItem = styled.div`

    ul {
        list-style: none;
        padding-left: 5px;
        line-height: 2em;
    }
`;