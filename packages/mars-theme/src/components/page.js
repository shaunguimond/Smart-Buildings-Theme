import { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import List from "./list";
import FeaturedMedia from "./featured-media";

/**
 * The Post component that Mars uses to render any kind of "post type", like
 * posts, pages, attachments, etc.
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const Page = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get a human readable date.
  const date = new Date(post.date);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, [actions.source]);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <div>

        {/* Hide author and date on pages */}
        {!data.isPage && (
          <div>
            <DateWrapper>
              {" "}
              on <b>{date.toDateString()}</b>
            </DateWrapper>
          </div>
        )}
      </div>

      {/* Look at the settings to see if we should include the featured image */}
      {state.theme.featured.showOnPost && (
        <FeaturedMedia id={post.featured_media} />
      )}

      {data.isAttachment ? (
        // If the post is an attachment, just render the description property,
        // which already contains the thumbnail.
        <div dangerouslySetInnerHTML={{ __html: post.description.rendered }} />
      ) : (
        // Render the content using the Html2React component so the HTML is
        // processed by the processors we included in the
        // libraries.html2react.processors array.
        <Content>
          <Html2React html={post.content.rendered} />
        </Content>
      )}
    </Container>
  ) : null;
};

export default connect(Page);

const Container = styled.div`
  margin: 0;
  padding: 24px;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }

  p {
    line-height: 39.6px;
  }
  figure {
    margin: 24px auto;
    /* Next line overrides an inline style of the figure element. */
    width: 100%;
    figcaption {
      display: block !important;
      font-size: 0.71111em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
      margin: 0;
      padding: 0.5rem;
      text-align: center;
      caption-side: bottom;
    }
  }
  blockquote {
    margin: 32px 0;
    border-left: 2px solid ${({ theme }) => theme.color};
    padding: 0 0 0 1em;
  }
  pre {
    background-color: #888888;
    padding: 25px;
    border-radius: 2px;
    font-size: 0.811111em;
    font-family: "Courier 10 Pitch", Courier, monospace;
    line-height: 1.8;
    overflow: auto;
  }
  code {
    font-size: 1.125em;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: monospace, monospace;
    font-size: 1em;
  }
  a {
    transition: color 110ms ease-in-out;
    color: ${({ theme }) => theme.color};
    text-decoration: underline;
  }
  /* WordPress Core Align Classes */
  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }
    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .alignright {
      float: right;
      margin-left: 24px;
    }
    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
  & .wp-block-image img {
    display: block;
    width: 100%;
    display: block;
    padding: 0.33px;
  }
  & .wp-block-image {
    
    box-shadow: 0 6.4px 14.4px 0 rgba(0,0,0,.132), 0 1.2px 3.6px 0 rgba(0,0,0,.108);
  }
  @media (prefers-color-scheme: dark) {
    & .wp-block-image {
      box-shadow: 0 6.4px 14.4px 0 rgba(256,256,256,.132), 0 1.2px 3.6px 0 rgba(256,256,256,.108);
    }
  }
  .wp-embed-aspect-16-9 {
    width: 100%;
    position: relative;
    padding-top:  56.25%;
    height: 0px;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
  .frontity-lazy-iframe {
    border: 0px;
  }
  /*Gallery*/
  & .gallery {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-bottom: calc(1.5 * 1rem);
  }
  & .gallery-item {
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 16px;
    text-align: center;
    vertical-align: top;
    width: 100%;
  }
  & .gallery-columns-2 .gallery-item {
    max-width: calc((100% - 16px * 1) / 2);
  }
  & .gallery-columns-2 .gallery-item:nth-of-type(2n + 2) {
    margin-right: 0;
  }
  & .gallery-columns-3 .gallery-item {
    max-width: calc((100% - 16px * 2) / 3);
  }
  & .gallery-columns-3 .gallery-item:nth-of-type(3n + 3) {
    margin-right: 0;
  }
  & .gallery-columns-4 .gallery-item {
    max-width: calc((100% - 16px * 3) / 4);
  }
  & .gallery-columns-4 .gallery-item:nth-of-type(4n + 4) {
    margin-right: 0;
  }
  & .gallery-columns-5 .gallery-item {
    max-width: calc((100% - 16px * 4) / 5);
  }
  & .gallery-columns-5 .gallery-item:nth-of-type(5n + 5) {
    margin-right: 0;
  }
  & .gallery-columns-6 .gallery-item {
    max-width: calc((100% - 16px * 5) / 6);
  }
  & .gallery-columns-6 .gallery-item:nth-of-type(6n + 6) {
    margin-right: 0;
  }
  & .gallery-columns-7 .gallery-item {
    max-width: calc((100% - 16px * 6) / 7);
  }
  & .gallery-columns-7 .gallery-item:nth-of-type(7n + 7) {
    margin-right: 0;
  }
  & .gallery-columns-8 .gallery-item {
    max-width: calc((100% - 16px * 7) / 8);
  }
  & .gallery-columns-8 .gallery-item:nth-of-type(8n + 8) {
    margin-right: 0;
  }
  & .gallery-columns-9 .gallery-item {
    max-width: calc((100% - 16px * 8) / 9);
  }
  & .gallery-columns-9 .gallery-item:nth-of-type(9n + 9) {
    margin-right: 0;
  }
  & .gallery-item:last-of-type {
    padding-right: 0;
  }
  & .gallery-caption {
    display: block;
    font-size: 0.71111em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0.5rem;
  }
  & .gallery-item > div > a {
    display: block;
    line-height: 0;
    box-shadow: 0 0 0 0 transparent;
  }
  & .gallery-item > div > a:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color};
  }
  /*Captions*/
  & .wp-caption {
    margin-bottom: calc(1.5 * 1rem);
  }
  @media only screen and (min-width: 768px) {
    & .wp-caption.aligncenter {
      position: relative;
      left: calc(calc(8 * (100vw / 12) - 28px) / 2);
      transform: translateX(-50%);
    }
  }
  @media only screen and (min-width: 1168px) {
    & .wp-caption.aligncenter {
      left: calc(calc(6 * (100vw / 12) - 28px) / 2);
    }
  }
  & .wp-caption img[class*="wp-image-"] {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  & .wp-caption-text {
    color: #767676;
    font-size: 0.71111em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0.5rem;
    text-align: center;
  }
  .wp-block-columns {
    display: flex;
    flex-wrap: wrap;
  }
  @media (min-width: 782px) {
    .wp-block-columns {
      flex-wrap: nowrap;
    }
  }
  .wp-block-column {
    flex-grow: 1;
    margin-bottom: 1em;
    flex-basis: 100%;
    min-width: 0;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  @media (min-width: 600px) {
    .wp-block-column {
      flex-basis: calc(50% - 16px);
      flex-grow: 0;
    }
    .wp-block-column:nth-child(even) {
      margin-left: 32px;
    }
  }
  @media (min-width: 782px) {
    .wp-block-column:not(:first-child) {
      margin-left: 32px;
    }
  }
  .wp-block-text-columns {
    display: flex;
  }
  .wp-block-text-columns.aligncenter {
    display: flex;
  }
  .wp-block-text-columns .wp-block-column {
    margin: 0 16px;
    padding: 0;
  }
  .wp-block-text-columns .wp-block-column:first-child {
    margin-left: 0;
  }
  .wp-block-text-columns .wp-block-column:last-child {
    margin-right: 0;
  }
  .wp-block-text-columns.columns-2 .wp-block-column {
    width: calc(100% / 2);
  }
  .wp-block-text-columns.columns-3 .wp-block-column {
    width: calc(100% / 3);
  }
  .wp-block-text-columns.columns-4 .wp-block-column {
    width: calc(100% / 4);
  }
  .wp-block-table.has-fixed-layout {
    table-layout: fixed;
    width: 100%;
  }
  .wp-block-table.alignleft,
  .wp-block-table.aligncenter,
  .wp-block-table.alignright {
    display: table;
    width: auto;
  }
  .wp-block-table.has-subtle-light-gray-background-color {
    background-color: #f3f4f5;
  }
  .wp-block-table.has-subtle-pale-green-background-color {
    background-color: #e9fbe5;
  }
  .wp-block-table.has-subtle-pale-blue-background-color {
    background-color: #e7f5fe;
  }
  .wp-block-table.has-subtle-pale-pink-background-color {
    background-color: #fcf0ef;
  }
  .wp-block-table.is-style-stripes {
    border-spacing: 0;
    border-collapse: inherit;
    background-color: transparent;
    border-bottom: 1px solid #f3f4f5;
  }
  .wp-block-table.is-style-stripes tr:nth-child(odd) {
    background-color: #f3f4f5;
  }
  .wp-block-table.is-style-stripes.has-subtle-light-gray-background-color
    tr:nth-child(odd) {
    background-color: #f3f4f5;
  }
  .wp-block-table.is-style-stripes.has-subtle-pale-green-background-color
    tr:nth-child(odd) {
    background-color: #e9fbe5;
  }
  .wp-block-table.is-style-stripes.has-subtle-pale-blue-background-color
    tr:nth-child(odd) {
    background-color: #e7f5fe;
  }
  .wp-block-table.is-style-stripes.has-subtle-pale-pink-background-color
    tr:nth-child(odd) {
    background-color: #fcf0ef;
  }
  .wp-block-table.is-style-stripes td {
    border-color: transparent;
  }

  /* Paragraph */

  .is-small-text {
    font-size: 0.875em;
  }
  
  .is-regular-text {
    font-size: 1em;
  }
  
  .is-large-text {
    font-size: 2.25em;
  }
  
  .is-larger-text {
    font-size: 3em;
  }
  
  // Don't show the drop cap when editing the paragraph's content. It causes a
  // number of bugs in combination with  fields. The caret
  // cannot be set around it, caret position calculation fails in Chrome, and
  // typing at the end of the paragraph doesn't work.
  .has-drop-cap:not(:focus)::first-letter {
    float: left;
    font-size: 8.4em;
    line-height: 0.68;
    font-weight: 100;
    margin: 0.05em 0.1em 0 0;
    text-transform: uppercase;
    font-style: normal;
  }
  
  // Prevent the dropcap from breaking out of the box when a background is applied.
  p.has-drop-cap.has-background {
    overflow: hidden;
  }
  
  p.has-background {
    padding: $block-bg-padding--v $block-bg-padding--h;
  }
  
  p.has-text-color a {
    color: inherit;
  }

  //  COMMON

// The following selectors have increased specificity (using the :root prefix)
// to assure colors take effect over another base class color, mainly to let
// the colors override the added specificity by link states such as :hover.


// Font sizes.
.has-small-font-size {
	font-size: 0.8125em;
}

.has-regular-font-size, // Not used now, kept because of backward compatibility.
.has-normal-font-size {
	font-size: 1em;
}

.has-medium-font-size {
	font-size: 1.25em;
}

.has-large-font-size {
	font-size: 2.25em;
}

.has-larger-font-size, // Not used now, kept because of backward compatibility.
.has-huge-font-size {
	font-size: 2.625em;
}

// Text alignments.
.has-text-align-center {
	text-align: center;
}

.has-text-align-left {
	/*rtl:ignore*/
	text-align: left;
}

.has-text-align-right {
	/*rtl:ignore*/
	text-align: right;
}

// This tag marks the end of the styles that apply to editing canvas contents and need to be manipulated when we resize the editor.
#end-resizable-editor-section {
	display: none;
}

// Block alignments.
.aligncenter {
	clear: both;
}

// Justification.
.items-justified-left {
	justify-content: flex-start;
}

.items-justified-center {
	justify-content: center;
}

.items-justified-right {
	justify-content: flex-end;
}

.items-justified-space-between {
	justify-content: space-between;
}

.screen-reader-text {
	border: 0;
	clip: rect(1px, 1px, 1px, 1px);
	-webkit-clip-path: inset(50%);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	word-wrap: normal !important;
}

.screen-reader-text:focus {
	background-color: $gray-300;
	clip: auto !important;
	clip-path: none;
	color: #444;
	display: block;
	font-size: 1em;
	height: auto;
	left: 5px;
	line-height: normal;
	padding: 15px 23px 14px;
	text-decoration: none;
	top: 5px;
	width: auto;
	z-index: 100000;
}
`;
