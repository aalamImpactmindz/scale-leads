"use client";
import React from "react";
import { Button, Table } from "react-bootstrap";
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
      console.log(response.data);
      setLeads(response.data.leads || []);
    } catch (err) {
      console.log("Error fetching leads:", err);
      setError("Could not load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const leads = [
  //   {
  //     serialNumber: 1,
  //     leadName: "Ankit Sharma",
  //     source: "LinkedIn",
  //     campaignName: "Spring Sale 2025",
  //     status: "New",
  //   },
  //   {
  //     serialNumber: 2,
  //     leadName: "Priya Verma",
  //     source: "LinkedIn",
  //     campaignName: "Summer Promotions",
  //     status: "Contacted",
  //   },
  //   {
  //     serialNumber: 3,
  //     leadName: "Rahul Mehta",
  //     source: "Email",
  //     campaignName: "Black Friday Deals",
  //     status: "Qualified",
  //   },
  //   {
  //     serialNumber: 4,
  //     leadName: "Sneha Kapoor",
  //     source: "LinkedIn",
  //     campaignName: "Holiday Campaign",
  //     status: "New",
  //   },
  //   {
  //     serialNumber: 5,
  //     leadName: "Mohit Khanna",
  //     source: "Email",
  //     campaignName: "New Year Campaign",
  //     status: "Lost",
  //   },
  //   {
  //     serialNumber: 6,
  //     leadName: "Tanya Joshi",
  //     source: "Email",
  //     campaignName: "Product Launch 2025",
  //     status: "Contacted",
  //   },
  //   {
  //     serialNumber: 7,
  //     leadName: "Arjun Patel",
  //     source: "Email",
  //     campaignName: "Valentine's Day Promo",
  //     status: "Qualified",
  //   },
  //   {
  //     serialNumber: 8,
  //     leadName: "Nisha Aggarwal",
  //     source: "LinkedIn",
  //     campaignName: "Back-to-School Sales",
  //     status: "New",
  //   },
  //   {
  //     serialNumber: 9,
  //     leadName: "Deepak Singh",
  //     source: "Email",
  //     campaignName: "Summer Collection",
  //     status: "Lost",
  //   },
  //   {
  //     serialNumber: 10,
  //     leadName: "Kavita Bansal",
  //     source: "LinkedIn",
  //     campaignName: "Winter Clearance",
  //     status: "Contacted",
  //   },
  // ];

  const handleEditClick = (lead) => {
    const encodedName = encodeURIComponent(lead.leadName);
    router.push(`/dashboard/leads/view/${encodedName}`);
  };

  return (
    <div className="leads mb-4">
      <h2 className="mb-4 fw-bold">Leads</h2>
      {loading ? (
        <div className="text-center py-5">
          <p className="mt-3">Loading leads...</p>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : leads.length === 0 ? (
        <p className="text-center py-5">No leads found.</p>
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
