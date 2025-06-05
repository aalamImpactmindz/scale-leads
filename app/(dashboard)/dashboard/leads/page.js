"use client";
import React from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

const PageDLeads = () => {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/linkedin/leads");
      setLeads(response.data.leads || []);
    } catch (err) {
      console.log("Error fetching leads:", err);
      setError("Could not load Leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (lead) => {
   window.open(lead.url, '_blank'); // Open in a new tab
    // const encodedName = encodeURIComponent(lead.leadName);
    // router.push(`/dashboard/leads/view/${encodedName}`);
  };

  return (
    <div className="leads mb-4">
      <h2 className="mb-4 fw-bold">Leads</h2>
      {loading ? (
        <div className="text-center py-5">
          <p className="mt-3">Loading leads...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="px-3 py-2 small">
          {error}
        </Alert>
      ) : leads.length === 0 ? (
        <Alert variant="warning" className="px-3 py-2 small">
          No leads found.
        </Alert>
      ) : (
        <Table striped hover responsive className="mb-0 small">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Lead Name</th>
              <th>Source</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{lead.name}</td>
                <td>LinkedIn</td>
                <td>{lead.location}</td>
                <td>{lead.replied === false ? "Pending" : "Active"}</td>
                <td>
                  <Button
                    className="btn-rounded"
                    size="sm"
                    onClick={() => handleEditClick(lead)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PageDLeads;
