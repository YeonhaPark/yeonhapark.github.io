import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';

const MySocialLinks = ({data: {site}}) => {

  const socialLinks = site?.siteMetadata.socialLinks.map((link) => {
    return (
      <SocialLinkItem key={link.name}>
        <a href={link.url}>{link.name}</a>
      </SocialLinkItem>
    );
  });

  return <SocialLinkList>{socialLinks}</SocialLinkList>;
};

const SocialLinks = (props) => {
  return <StaticQuery 
  query={graphql`
  {
    site {
      siteMetadata {
        socialLinks {
          name
          url
        }
      }
    }
  }
`}
  render={(data) => <MySocialLinks data={data} {...props}/>}/>
}
export default SocialLinks;

const SocialLinkList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
`;

const SocialLinkItem = styled.li`
  margin-right: var(--size-400);
  text-transform: uppercase;

  & a {
    color: inherit;
    font-size: var(--size-300);
  }
`;
