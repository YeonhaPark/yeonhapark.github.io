import React from 'react';
import styled from 'styled-components';

const Skills = ({ title, skills }) => {
  return (
    <div>
      <h4>{title}</h4>
      <Ul>{skills.map((skill, idx) => <Li key={idx}>{skill.name}</Li>)}</Ul>
    </div>
  );
};

const Ul = styled.ul`
padding-inline-start: 5px;`

const Li = styled.li`
display: inherit`

export default Skills;
