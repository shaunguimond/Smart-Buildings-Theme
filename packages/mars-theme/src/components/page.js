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
      {state.theme.featured.showOnPost && !data.isHome ? (
        <FeaturedImageContainer>
          <FeaturedMedia id={post.featured_media} />
          <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </FeaturedImageContainer>
      ): null }

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
`;

const FeaturedImageContainer = styled.div`

`;

const Title = styled.h1`
  position: relative;
  margin: 0;
  margin-top: calc(-25vh - 74px);
  margin-bottom: 8px;
  color: white;
  text-align: center;
  margin-bottom: calc(25vh + 74px)

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
  margin: 12px 12px 0px 12px;
  min-height: 75vh;

  @media only screen and (min-width: 980px) {
    margin: 24px 12.5vw 0px 12.5vw;
  }

  * {
    max-width: 100%;
  }

  p{
    line-height: 1.25em;
  }

  figure {
    margin: 24px auto;

    img {
      height: auto;
    }

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

  figure {
    margin: 24px auto;
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
    height: fit-content;
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

.is-vertically-aligned-center {
  align-content: center;
}

.wp-block-image {
    width: 100%;

    figure {
      width: fit-content;
    }
  }

.wp-block-column.is-vertically-aligned-bottom, .wp-block-column.is-vertically-aligned-center, .wp-block-column.is-vertically-aligned-top {
    width: 100%;
}

.wp-block-column.is-vertically-aligned-center {
    -ms-grid-row-align: center;
    align-self: center;

}

// WORDPRESS BUTTONS

// This variable is repeated across Button, Buttons, and Buttons editor styles.
$blocks-block__margin: 0.5em;

.wp-block-buttons {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	&.is-vertical {
		flex-direction: column;
		> .wp-block-button {
			/*rtl:ignore*/
			margin-right: 0;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	// Increased specificity to override blocks default margin.
	> .wp-block-button {
		display: inline-block;
		/*rtl:ignore*/
		margin-left: 0;
		/*rtl:ignore*/
		margin-right: $blocks-block__margin;
		margin-bottom: $blocks-block__margin;

		&:last-child {
			/*rtl:ignore*/
			margin-right: 0;
		}
	}

	&.is-content-justification-left {
		justify-content: flex-start;
		&.is-vertical {
			align-items: flex-start;
		}
	}

	&.is-content-justification-center {
		justify-content: center;
		&.is-vertical {
			align-items: center;
		}
	}

	&.is-content-justification-right {
		justify-content: flex-end;

		> .wp-block-button {
			/*rtl:ignore*/
			margin-left: $blocks-block__margin;
			/*rtl:ignore*/
			margin-right: 0;

			&:first-child {
				/*rtl:ignore*/
				margin-left: 0;
			}
		}

		&.is-vertical {
			align-items: flex-end;
		}
	}

	&.is-content-justification-space-between {
		justify-content: space-between;
	}

	// Kept for backward compatibility.
	&.aligncenter {
		text-align: center;
	}
	&.alignleft .wp-block-button {
		/*rtl:ignore*/
		margin-left: 0;
		/*rtl:ignore*/
		margin-right: $blocks-block__margin;

		&:last-child {
			/*rtl:ignore*/
			margin-right: 0;
		}
	}
	&.alignright .wp-block-button {
		/*rtl:ignore*/
		margin-right: 0;
		/*rtl:ignore*/
		margin-left: $blocks-block__margin;

		&:first-child {
			/*rtl:ignore*/
			margin-left: 0;
		}
	}

	// Back compat: Inner button blocks previously had their own alignment
	// options. Forcing them to 100% width in the flex container replicates
	// that these were block level elements that took up the full width.
	//
	// This back compat rule is ignored if the user decides to use the
	// newer justification options on the button block, hence the :not.
	//
	// Disable the stylelint rule, otherwise this selector is ugly!
	/* stylelint-disable indentation */
	&:not(
		.is-content-justification-space-between,
		.is-content-justification-right,
		.is-content-justification-left,
		.is-content-justification-center
	) .wp-block-button.aligncenter {
	/* stylelint-enable indentation */
		margin-left: auto;
		margin-right: auto;
		margin-bottom: $blocks-block__margin;
		width: 100%;
	}
}

// Legacy buttons that did not come in a wrapping container.
.wp-block-button.aligncenter {
	text-align: center;
}

// CUSTOM CLASSES 

.wp-block-button {  
  margin: 15px;

  a {
    background-color: rgba(0, 0, 0, 0.9);
    border: rgb(11, 12, 34) 1px solid;
    transition: border-bottom 0.3s linear;
    border-radius: 5px;
    color: white;
    text-decoration: none;
    padding: 15px;
  }
}

.wp-block-button:hover {
  a{
  border-bottom: #ffe115 1px solid;
  opacity: 0.7;
  }
}
@media only screen and (min-width: 780px) {
.wp-block-button:first-of-type {
  margin-right: 25px;
}


}

.innovators-container {
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 24px;
margin-bottom: 48px;
margin-top: 24px;

.wp-block-column {
  margin-left: 0px;
}

img {
  height: 100%;
  width: auto;
  position: relative;
}

}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  p, input, textarea {
    width: 100%;

  }
}

input[type=submit] {
  background-color: rgba(0, 0, 0, 0.9);
  border: rgb(11, 12, 34) 1px solid;
  transition: border-bottom 0.3s linear;

}

input[type=submit]:hover {
  border-bottom: #ffe115 1px solid;
  opacity: 0.7;
}

.contact-form {
  border-radius: 8px;
  color: white;
  
}

.services-clipped {
  clip-path: polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
  background-color: rgb(11, 12, 34);
  aspect-ratio: 1/1;


  figure {
    padding: 25%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.service-steps-container {


  .service-steps {

    .wp-block-column:first-of-type {
        flex-basis: 300px;
        min-width: 250px;

      .service-steps-1 {
        background-color: rgb(11, 12, 34);
        border-radius: 50%;
        color: white;
        height: 250px;
        width: 250px;
    
        .wp-block-group__inner-container {
          display: flex;
          height: 100%;
          align-items: center;
    
          p {
            width: 100%;
            height: fit-content;
            font-size: 56px;
          }
        }
    
      }

    }
    .wp-block-column:nth-of-type(2) {
      flex-basis: 100%;
    }
    }

.service-steps:nth-of-type(3) {
  margin-left: 40px;
}
.service-steps:nth-of-type(4) {
  margin-left: 80px;
}
.service-steps:nth-of-type(5) {
  margin-left: 120px;
}
}

`;
