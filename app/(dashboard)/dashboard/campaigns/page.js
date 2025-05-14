"use client";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { useRouter } from "next/navigation";

const Campaigns = () => {
  const router = useRouter();

  const campaignData = [
    {
      serialNumber: 1,
      campaignName: "Spring Sale 2025",
      targetChannels: "Email, Social Media",
      status: "Active",
    },
    {
      serialNumber: 2,
      campaignName: "Summer Promotions",
      targetChannels: "Email, Paid Ads",
      status: "Inactive",
    },
    {
      serialNumber: 3,
      campaignName: "Black Friday Deals",
      targetChannels: "Website, Social Media",
      status: "Active",
    },
    {
      serialNumber: 4,
      campaignName: "Holiday Campaign",
      targetChannels: "Email, Affiliate Marketing",
      status: "Scheduled",
    },
    {
      serialNumber: 5,
      campaignName: "New Year Campaign",
      targetChannels: "Social Media, Influencers",
      status: "Active",
    },
    {
      serialNumber: 6,
      campaignName: "Product Launch 2025",
      targetChannels: "Email, Social Media, Website",
      status: "Inactive",
    },
    {
      serialNumber: 7,
      campaignName: "Valentine's Day Promo",
      targetChannels: "Email, SMS",
      status: "Active",
    },
    {
      serialNumber: 8,
      campaignName: "Back-to-School Sales",
      targetChannels: "Email, Google Ads",
      status: "Scheduled",
    },
    {
      serialNumber: 9,
      campaignName: "Summer Collection",
      targetChannels: "Social Media, Influencers",
      status: "Inactive",
    },
    {
      serialNumber: 10,
      campaignName: "Winter Clearance",
      targetChannels: "Email, Website",
      status: "Active",
    },
  ];

  const handleEditClick = (campaign) => {
    const encodedName = encodeURIComponent(campaign.campaignName);
    router.push(
      `/dashboard/campaigns/edit/${encodedName}?targetChannels=${encodeURIComponent(
        campaign.targetChannels
      )}&status=${campaign.status}`
    );
  };

  return (
    <div className="campaigns mb-4">
      <h2 className="mb-4 fw-bold">Campaigns</h2>
      <Table striped hover responsive className="mb-0 small">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Campaign Name</th>
            <th>Target Channels</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaignData.map((campaign) => (
            <tr key={campaign.serialNumber}>
              <td>{campaign.serialNumber}</td>
              <td>
                <h6 className="mb-0" onClick={() => handleEditClick(campaign)}>
                  {campaign.campaignName}
                </h6>
              </td>
              <td>{campaign.targetChannels}</td>
              <td>{campaign.status}</td>
              <td>
                <Button className="btn-rounded" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Campaigns;
