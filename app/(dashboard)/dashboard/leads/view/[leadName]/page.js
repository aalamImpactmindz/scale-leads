"use client";
import { Card, Row, Col } from "react-bootstrap";

const PageViewLead = () => {
  return (
    <div className="messages mb-4">
      <div className="d-flex flex-wrap flex-column gap-3">
        <h2 className="mb-2 fw-bold">Messages from client</h2>
        <Row className="d-none d-md-flex">
          <Col md={6}>
            <h5 className="mb-0">Received</h5>
          </Col>
          <Col md={6}>
            <h5 className="mb-0">Sent</h5>
          </Col>
        </Row>
        <Row className="g-3">
          <Col md={6}>
            <Card className="mb-2 p-3 bg-gray color-light h-100 rounded-4 border-0">
              <p className="mb-0">
                Phasellus at commodo turpis. Praesent auctor dui et libero
                semper porta. Suspendisse potenti. Maecenas vel ipsum tellus.
                Vivamus pretium mauris ornare, aliquet libero ac, fringilla leo.
                Fusce cursus sapien arcu, at posuere nulla consectetur at.
                Vivamus vel posuere est. Morbi tincidunt ante mauris, nec
                finibus nunc ultrices vel. Aenean sollicitudin enim sit amet
                feugiat ornare. Duis non augue nulla. Sed enim nibh, auctor ac
                auctor non, eleifend eu nisl. Mauris ultricies venenatis eros
                sed malesuada.
              </p>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-2 p-3 d-bg-gradient color-light h-100 rounded-4 border-0">
              <p className="mb-0">
                Aenean in lacinia nibh, a tristique urna. Donec non urna vitae
                urna finibus feugiat. Mauris vitae velit pretium, ultricies
                lectus tincidunt, feugiat ligula. Cras pharetra lacus ac leo
                fermentum, ac varius sapien sollicitudin. Etiam tellus purus,
                vestibulum sed metus placerat, blandit convallis nisi. Curabitur
                semper ligula dui, non convallis nisl sagittis eget. Praesent in
                eros dolor. Suspendisse gravida sem sit amet dolor luctus, ut
                dignissim felis venenatis.
              </p>
            </Card>
          </Col>
        </Row>
        <Row className="g-3">
          <Col md={6}>
            <Card className="mb-2 p-3 bg-gray color-light h-100 rounded-4 border-0">
              <p className="mb-0">
                Aliquam commodo dolor non lacus varius, eu dictum est dictum.
                Duis ac purus ac risus rutrum finibus. Nam scelerisque felis vel
                tempor suscipit. Mauris vitae rhoncus dui. Phasellus at pretium
                risus. Mauris venenatis velit vel nisl dictum congue.
                Pellentesque imperdiet nec mauris laoreet venenatis. Sed dui
                turpis, suscipit in gravida ac, accumsan quis nunc. Vestibulum
                neque mauris, ornare sit amet urna tristique, efficitur
                sollicitudin elit. Fusce commodo nisl sed tristique vestibulum.
              </p>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-2 p-3 d-bg-gradient color-light h-100 rounded-4 border-0">
              <p className="mb-0">
                Ut gravida tellus sit amet elementum commodo. In et congue est.
                Suspendisse volutpat, leo eu sodales varius, sapien leo iaculis
                quam, in dictum mi enim et dolor. Suspendisse molestie volutpat
                bibendum. Integer erat quam, rhoncus ac ex non, vehicula
                convallis lorem. Praesent luctus ipsum in ex blandit aliquet.
                Mauris lobortis mi ut massa vestibulum, quis placerat nisi
                rhoncus.
              </p>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="mt-4 d-flex flex-wrap flex-column gap-3">
        <h2 className="mb-2 fw-bold">Messages from leads</h2>
        <Row className="d-none d-md-flex">
          <Col md={6}>
            <h5 className="mb-0">Received</h5>
          </Col>
          <Col md={6}>
            <h5 className="mb-0">Sent</h5>
          </Col>
        </Row>
        <Row className="g-3">
          <Col md={6}>
            <Card className="mb-2 p-3 bg-gray color-light h-100 rounded-4 border-0">
              <p className="mb-0">
                Phasellus at commodo turpis. Praesent auctor dui et libero
                semper porta. Suspendisse potenti. Maecenas vel ipsum tellus.
                Vivamus pretium mauris ornare, aliquet libero ac, fringilla leo.
                Fusce cursus sapien arcu, at posuere nulla consectetur at.
                Vivamus vel posuere est. Morbi tincidunt ante mauris, nec
                finibus nunc ultrices vel. Aenean sollicitudin enim sit amet
                feugiat ornare. Duis non augue nulla. Sed enim nibh, auctor ac
                auctor non, eleifend eu nisl. Mauris ultricies venenatis eros
                sed malesuada.
              </p>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-2 p-3 d-bg-gradient color-light h-100 rounded-4 border-0">
              <p className="mb-0">
                Aenean in lacinia nibh, a tristique urna. Donec non urna vitae
                urna finibus feugiat. Mauris vitae velit pretium, ultricies
                lectus tincidunt, feugiat ligula. Cras pharetra lacus ac leo
                fermentum, ac varius sapien sollicitudin. Etiam tellus purus,
                vestibulum sed metus placerat, blandit convallis nisi. Curabitur
                semper ligula dui, non convallis nisl sagittis eget. Praesent in
                eros dolor. Suspendisse gravida sem sit amet dolor luctus, ut
                dignissim felis venenatis.
              </p>
            </Card>
          </Col>
        </Row>
        <Row className="g-3">
          <Col md={6}>
            <Card className="mb-2 p-3 bg-gray color-light h-100 rounded-4 border-0">
              <p className="mb-0">
                Aliquam commodo dolor non lacus varius, eu dictum est dictum.
                Duis ac purus ac risus rutrum finibus. Nam scelerisque felis vel
                tempor suscipit. Mauris vitae rhoncus dui. Phasellus at pretium
                risus. Mauris venenatis velit vel nisl dictum congue.
                Pellentesque imperdiet nec mauris laoreet venenatis. Sed dui
                turpis, suscipit in gravida ac, accumsan quis nunc. Vestibulum
                neque mauris, ornare sit amet urna tristique, efficitur
                sollicitudin elit. Fusce commodo nisl sed tristique vestibulum.
              </p>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-2 p-3 d-bg-gradient color-light h-100 rounded-4 border-0">
              <p className="mb-0">
                Ut gravida tellus sit amet elementum commodo. In et congue est.
                Suspendisse volutpat, leo eu sodales varius, sapien leo iaculis
                quam, in dictum mi enim et dolor. Suspendisse molestie volutpat
                bibendum. Integer erat quam, rhoncus ac ex non, vehicula
                convallis lorem. Praesent luctus ipsum in ex blandit aliquet.
                Mauris lobortis mi ut massa vestibulum, quis placerat nisi
                rhoncus.
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PageViewLead;
