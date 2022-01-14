import React from 'react';
import Layout from '../components/layout';
import Skills from '../components/skills';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const presentation = [{id: 1, name: "협업하는 개발자 박연하입니다. 가치 전달에 충실한 서비스를 만들기 위해 더 좋은 개발자로 성장해 나아가고자 합니다"}]

const technicalSkills = [
  { id: 1, name: '- React' },
  { id: 2, name: '- TypeScript' },
  { id: 3, name: '- Redux' },
  { id: 4, name: '- HTML5 & CSS3' },
  { id: 5, name: '- SASS' },
  { id: 6, name: '- Emotion' },
  { id: 8, name: '- Styled Component' },
  { id: 9, name: '- Git' },
];
const languageSkills = [
  { id: 1, name: 'English(Professional Proficiency)' },
  { id: 2, name: 'Spanish(Professional Proficiency)' },
];
const contacts = [
  { id: 1, name: 'Email: yonaprisca@gmail.com' },
];

const ResumeTemplate = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;

  return (
    <Layout title={frontmatter.title}>
      <Title>PARK YEONHA</Title>
      <ResumeWrapper>
        <ResumeProfileWrapper>
          <div>
          <Skills title="Personal Profile" skills={presentation} />
          <Skills title="Technical Skills" skills={technicalSkills} />
          <Skills title="Language Skills" skills={languageSkills} />
          </div>
          <Skills title="Contact Me At" skills={contacts} />
        </ResumeProfileWrapper>
        <ResumeContents dangerouslySetInnerHTML={{ __html: html }} />
      </ResumeWrapper>
    </Layout>
  );
};

export default ResumeTemplate;

const ResumeWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  @media screen and (max-width: 1000px) {
    & {
      flex-direction: column;
    }

    & > * {
      margin-top: 2rem;
      width: 100%;
      text-align: center;
    }
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  font-size: 4rem;
  font-weight: 700;
`;

const ResumeProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  border: 4px solid black;
  padding: 2rem 0.75rem;
  @media screen and (min-width: 1001px) {
    width: 320px;
  }
`;

const ResumeContents = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 60ch;
  & p {
    font-size: var(--size-400);
  }
`;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        profile_image {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: PNG, height: 400)
          }
        }
      }
    }
  }
`;
