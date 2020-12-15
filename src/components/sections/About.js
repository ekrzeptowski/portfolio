import React, { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { SectionTitle } from "../typography";

const About = forwardRef((props, ref) => {
  return (
    <section id="about" ref={ref}>
      <SectionTitle>About me</SectionTitle>
      <ReactMarkdown>{props.about}</ReactMarkdown>
    </section>
  );
});

export default About;
