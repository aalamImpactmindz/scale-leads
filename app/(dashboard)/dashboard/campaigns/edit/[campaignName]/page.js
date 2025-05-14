"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const EditCampaign = () => {
  const router = useRouter();
  const params = useParams(); // ✅ Grab dynamic param from URL
  const searchParams = useSearchParams();

  const decodedCampaignName = decodeURIComponent(params.campaignName);

  const [formData, setFormData] = useState({
    campaignName: decodedCampaignName,
    targetChannels: "",
    status: "",
  });

  useEffect(() => {
    const targetChannels = searchParams.get("targetChannels");
    const status = searchParams.get("status");

    if (targetChannels && status) {
      setFormData({
        campaignName: decodedCampaignName,
        targetChannels: decodeURIComponent(targetChannels),
        status,
      });
    }
  }, [decodedCampaignName, searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Updated campaign data:", formData);
    router.push("/campaigns");
  };

  if (!formData.targetChannels || !formData.status) {
    return <p>No campaign data provided via query params.</p>;
  }

  return (
    <div className="edit-campaign mb-4">
      <h2 className="mb-4 fw-bold">Edit Campaign: {formData.campaignName}</h2>
      <Form className="d-bg-gradient p-4 rounded-2">
        <Form.Group className="mb-3">
          <Form.Label>Campaign Name</Form.Label>
          <Form.Control
            type="text"
            name="campaignName"
            value={formData.campaignName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Target Channels</Form.Label>
          <Form.Control
            type="text"
            name="targetChannels"
            value={formData.targetChannels}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="form-control"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Scheduled</option>
          </Form.Select>
        </Form.Group>
        <Button className="btn-main me-2" onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button className="btn-main" onClick={() => router.back()}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditCampaign;
