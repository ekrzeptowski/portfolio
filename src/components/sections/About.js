import React, { forwardRef } from "react";
import { SectionTitle } from "../typography";

const About = forwardRef((props, ref) => {
  return (
    <section id="about" ref={ref}>
      <SectionTitle>About me</SectionTitle>
    </section>
  );
});

export default About;