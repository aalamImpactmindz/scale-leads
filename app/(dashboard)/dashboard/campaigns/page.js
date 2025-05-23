"use client";
import React from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

const Campaigns = () => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/user-campaigns");
      setCampaigns(response.data.campaigns || []);
    } catch (err) {
      console.log("Error fetching campaigns:", err);
      setError("Could not load Campaigns.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (campaign) => {
    const campaignWithStatus = {
      ...campaign,
      campaign_status: campaign.campaign_status,
    };
    localStorage.setItem(
      "campaign_to_edit",
      JSON.stringify(campaignWithStatus)
    );
    const encodedName = encodeURIComponent(campaign.campaign_name);
    router.push(`/dashboard/campaigns/edit/${encodedName}`);
  };

  return (
    <div className="campaigns mb-4">
      <div className="d-heading-container d-flex flex-wrap justify-content-between mb-4">
        <h2 className="mb-0 fw-bold me-5 d-inline-block">Campaigns</h2>
        <Link href="/dashboard/onboarding">
          <Button className="btn-rounded" size="sm">
            Add New Campaign
          </Button>
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <p className="mt-3">Loading campaigns...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="px-3 py-2 small">
          {error}
        </Alert>
      ) : campaigns.length === 0 ? (
        <p className="text-center py-5">No campaigns found.</p>
      ) : (
        <Table striped hover responsive className="mb-0 small">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Campaign Name</th>
              <th>Target Channels</th>
              <th>Number of Leads</th>
              <th>Campaign Status</th>
              <th>Sequences in progress</th>
              <th>Results</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <h6
                    className="mb-0"
                    onClick={() => handleEditClick(campaign)}
                  >
                    {campaign.campaign_name}
                  </h6>
                </td>
                <td>{campaign.channel}</td>
                <td>8</td>
                <td>In progress</td>
                <td>{campaign.campaign_status}</td>
                <td>2</td>
                <td>
                  <Button className="btn-rounded" size="sm">
                    Delete
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

export default Campaigns;
