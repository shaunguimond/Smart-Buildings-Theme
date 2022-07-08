import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Home from "./home";
import Page from "./page";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import Footer from "./footer";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles forimport the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <Home when={data.isHome} />
          <Page when={data.isPage} />
          <List when={data.isArchive} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </Main>

      <Footer />
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  h1 {
    font-size: 2.125em;
  }

  h2 {
    font-size: 1.725em;
  }

  h3 {
    font-size: 1.325em;
  }
  
  h4 {
    font-size: 1.225em;
    font-weight: 800;
    
  }

  h5 {
    font-size: 1.175em;

  }

  h6 {
    font-size: 0.925em;
    margin-top: 0.225em;
    margin-bottom: 0.225em;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0,0,0,0.9);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0px;
  z-index: 69;

  @media only screen and (max-width: 500px) {
    & {
      height: 80px;
    }
  }
`;

const Main = styled.div`
  display: block;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
  overflow-x: hidden;
`;
