"use client";
import { Row, Col } from "react-bootstrap";

export default function DashboardHome() {
  return (
    <div className="dashboard">
      <h2 className="mb-4 fw-bold">Dashboard</h2>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        <Col>
          <div className="bg-success px-3 py-2 rounded-2 text-light">
            <span className="display-4 fw-medium d-block lh-1">26</span>Leads
          </div>
        </Col>
        <Col>
          <div className="bg-danger px-3 py-2 rounded-2 text-light">
            <span className="display-4 fw-medium d-block lh-1">14</span>Campaigns
          </div>
        </Col>
        <Col>
          <div className="bg-primary px-3 py-2 rounded-2 text-light">
            <span className="display-4 fw-medium d-block lh-1">8</span>Plan
          </div>
        </Col>
        <Col>
          <div className="bg-secondary px-3 py-2 rounded-2 text-light">
            <span className="display-4 fw-medium d-block lh-1">19</span>Something
            else
          </div>
        </Col>
      </Row>
    </div>
  );
}
