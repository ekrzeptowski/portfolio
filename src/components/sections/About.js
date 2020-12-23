import React, { forwardRef } from "react";

import { SectionTitle } from "../typography";

const About = forwardRef((props, ref) => {
  return (
    <section id="about" ref={ref}>
      <SectionTitle>About me</SectionTitle>
      <div dangerouslySetInnerHTML={{ __html: props.about }}></div>
    </section>
  );
});

export default About;
