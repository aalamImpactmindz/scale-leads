import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import imageBlog5 from "@/public/assets/images/blog5.png";
import Image from "next/image";
import BlogCard from "@/components/blog-card/BlogCard";

const blogHowToCreateAnEffectiveDesignPortfolio = () => {
  return (
    <div className="blog-detail sec-padding">
      <Container fluid="xl">
        <Heading title="How to Create an Effective Design Portfolio" />
        <div className="ratio ratio-16x9 mb-3">
          <Image
            src={imageBlog5}
            alt="Blog"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="d-flex flex-wrap justify-content-between small mb-3">
          <span>12 janv. 2022</span>
          <span>6 min read</span>
        </div>
        <h3 className="color-light">What is a portfolio?</h3>
        <p>
          A portfolio is any method used to showcase your best work. No matter
          the industry—fashion, architecture, or design—there are tons of ways
          to display your work in order to get a new job or expand your audience
          or customers.
        </p>
        <h3 className="color-light">Types of design portfolios</h3>
        <p>
          Depending on the type of design work that you do, there are different
          portfolio formats that will be best suited for your needs. A design
          portfolio can be digital in the form of a website, slideshow, or PDF,
          but it can also be analog in the form of a print book or poster.
        </p>
        <h3 className="color-light">Graphic design portfolio</h3>
        <p>
          When it comes to graphic design, designing a PDF as your portfolio is
          becoming more and more popular to highlight your work and PDF design
          skills. Using tools like InDesign and Photoshop, you can create
          multi-page PDFs that can be fine-tuned and formatted any way you like.
          With new software, like Framer, it's becoming even easier to create a
          PDF online and share it in no time. The result of your PDF portfolio
          will be a brochure or one-pager piece that shows off examples of your
          best work along with the descriptions of each project and more related
          information.
        </p>
        <h3 className="color-light">UX design portfolio</h3>
        <p>
          For UX designers, online portfolios are probably the most popular type
          today. This can be in the form of a simple one-page website with your
          contact information or a more thorough online gallery site. If your
          main discipline is web design, a portfolio website is the choice for
          you. It serves as an example itself of your web design skills, as well
          as highlighting your best work where it's meant to be seen. Portfolio
          websites come with many benefits, especially as most of our work is
          done online. First, they can show off design properties like animation
          and interactivity.
        </p>
        <p>
          As an important part of UX design, it's essential to show these
          aspects so viewers get the full experience of your designs. Next,
          website portfolios are super easy to share. You can include the link
          in your social media bios as well as send the link to anyone at any
          time. Your work will become more readily available this way. Finally,
          online portfolios are a great way to show off your personality. As the
          more new-age mention of displaying your work, you are less constrained
          by the rules of the classic print portfolio.
        </p>
        <p>
          When going the online portfolio route, there are some drawbacks.
          First, website portfolios often require knowledge of code to create.
          This can be a blocker for many UX designers. However, there are
          increasingly more tools, like Framer, that allow you to create a
          design portfolio without code. Next, you have to keep in mind the
          constraints of the web, such as breakpoints, different browsers, and
          rendering issues that you wouldn't have to think about in print
          portfolios. Finally, website portfolios can be more time-consuming to
          create depending on how many site pages you need.
        </p>
        <p>
          If you're considering building a stunning portfolio website but don't
          want to start from scratch, check out the ready-made portfolio
          templates at{" "}
          <a
            href="https://templyo.io/templates"
            target="_blank"
            className="link-main"
          >
            Templyo.io/templates
          </a>
          . These templates make it easy to create professional, eye-catching
          portfolio websites tailored to your needs.
        </p>
        <p>
          Here is a list of{" "}
          <a
            href="https://github.com/mejed-alkoutaini/designer-portfolios"
            target="_blank"
            className="link-main"
          >
            designer portfolios
          </a>{" "}
          for your inspiration
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
                image={imageBlog5}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog5}
                date="8 avr. 2022"
                timeToRead="6 min read"
              />
            </Col>
            <Col>
              <BlogCard
                link="/"
                title="Lorem ipsum dolor sit amet consectetur"
                image={imageBlog5}
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

export default blogHowToCreateAnEffectiveDesignPortfolio;
