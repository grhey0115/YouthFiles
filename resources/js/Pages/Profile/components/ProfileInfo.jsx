import React from 'react';
import { Card, Descriptions } from 'antd';

export default function ProfileInfo({ 
  personalInformation, 
  educationalBackground, 
  additionalInformation, 
  emergencyContact 
}) {
  return (
    <div className="p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card title="Personal Information" bordered={false}>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Sitio">{personalInformation?.sitio || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Birth Date">{personalInformation?.date_of_birth || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Age">{personalInformation?.age || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Civil Status">{personalInformation?.civil_status || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Religion">{personalInformation?.religion || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Gender">{personalInformation?.gender || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Family Members">{personalInformation?.family_members || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Siblings">{personalInformation?.siblings || "N/A"}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Educational Background */}
        <Card title="Educational Background" bordered={false}>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Current Status">{educationalBackground?.current_status || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Course">{educationalBackground?.course || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Year Graduated">{educationalBackground?.year_graduated || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Year Level">{educationalBackground?.year_level || "N/A"}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Additional Information */}
        <Card title="Additional Information" bordered={false}>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Currently Working">
              {additionalInformation.is_currently_working === "1" ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Hobbies">
              {additionalInformation?.hobbies?.join(", ") || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="PWD">
              {additionalInformation?.is_pwd === "1" ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Conflict with Law">
              {additionalInformation?.has_conflict_with_law === "1" ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Indigenous">
              {additionalInformation?.is_indigenous === "1" ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Registered Voter">
              {additionalInformation?.is_registered_voter === "1" ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Attended Assembly">
              {additionalInformation?.attended_assembly === "1" ? "Yes" : "No"}
            </Descriptions.Item>
            {additionalInformation?.attended_assembly === "0" && (
              <Descriptions.Item label="Why No Assembly">
                {additionalInformation?.why_no_assembly || "N/A"}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Residency Status">
              {additionalInformation?.residency_status || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Emergency Contact */}
        <Card title="Emergency Contact" bordered={false}>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Name">{emergencyContact?.name || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Relationship">{emergencyContact?.relationship || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Contact Number">{emergencyContact?.contact_number || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Address">{emergencyContact?.address || "N/A"}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
}