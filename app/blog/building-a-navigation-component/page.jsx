import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import imageBlog4 from "@/public/assets/images/blog4.png";
import Image from "next/image";
import BlogCard from "@/components/blog-card/BlogCard";

const blogBuildingANavigationComponent = () => {
  return (
    <div className="blog-detail sec-padding">
      <Container fluid="xl">
        <Heading title="Building a Navigation Component with Variables" />
        <div className="ratio ratio-16x9 mb-3">
          <Image
            src={imageBlog4}
            alt="Blog"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="d-flex flex-wrap justify-content-between small mb-3">
          <span>6 févr. 2022</span>
          <span>6 min read</span>
        </div>
        <p>
          Navigation is key within any digital interface. Smart Components
          enable us to create custom interactive navigation components that work
          perfectly with the rest of your prototype.In this guide, we will cover
          the concepts of nesting components, adding events to elements in a
          component using Event Variables, and passing these through your
          components. One of the main benefits of using nested components is
          that it provides full control over its states, such as unique hover
          states of elements within another component.
        </p>
        <h3 className="color-light">Starting at the atomic level</h3>
        <p>
          Framer allows you to create fully interactive and animated components,
          and even allows you to nest components within other components. We're
          building a navigation bar component for a website that will contain
          two different kinds of nested components, with their own unique
          interactions. Our project will contain a Navigation bar that contains
          various nested components, namely five Nav items and one Shopping cart
          component. The design of our nested components, the nav list item and
          the shopping cart, will impact how we design our navigation bar. For
          this reason, an optimal workflow includes starting with the 'deepest'
          nested component and building up from there.
        </p>
        <h3 className="color-light">Nesting components</h3>
        <p>
          {" "}
          Once we have our two components ready, we can start creating the
          component in which we will nest these. Draw your navigation bar,
          select it on the canvas and click the Component tool in the Toolbar.
          To nest a different component in our new component, just drag any
          other component to the Component Canvas and place it within your
          designed navigation bar.
        </p>
        <h3 className="color-light">
          Triggering interactions from the navigation bar
        </h3>
        <p>
          Back on the main canvas, we'd like to be able to tap 'Clothing' and
          navigate to an entire new Screen. If you'd connect the component using
          the Prototyping Connector to a new screen, we could set up an
          Interaction. However, this would be triggered if we tap anywhere
          within our component. This isn't what we want to do, as we want to
          trigger this transition only from a specific element. This is where
          Event Variables come in, which are special types of Variables not
          attached to properties (like opacity or fill) but instead to events.
        </p>
      </Container>
      <div className="more-blogs sec-padding">
        <Container>
          <h3 className="mb-3">
            Read <span className="color-theme">More</span>
          </h3>
          <Row className="g-3 g-lg-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog4}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog4}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog4}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default blogBuildingANavigationComponent;
