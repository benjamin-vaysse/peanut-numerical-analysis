import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";
import CommentContainer from "../containers/CommentContainer";
import { Typography, Spacing } from "../rules";
import Disqus from "disqus-react"


const Help = () => {
  const disqusShortname = "peanut-1"; // found in your Disqus.com dashboard
  const disqusConfig = {
    url: "http://localhost:3000", //this.props.pageUrl
    identifier: "help-page", //this.props.uniqueId
    title: "Help" //this.props.title
  };

  return (
    <React.Fragment>
      <Title>Help</Title>
      <BigContainer>
        <h3>Common Questions</h3>
        <p></p>
      </BigContainer>
      <CommentContainer>
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </CommentContainer>
    </React.Fragment>
  );
};

const Title = styled("div")`
  font-size: ${Typography.title.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

export default Help;