import React, { useState, useEffect } from "react";
import { usePage, Head } from "@inertiajs/react";
import axios from "axios";
import { message } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProfileHeader from "./Partials/ProfileHeader";
import ProfileTabs from "./Partials/ProfileTabs";
import GCashRedemptionModal from "./components/GCashRedemptionModal";

export default function ViewProfile({ mustVerifyEmail, status }) {
  const { 
    user, 
    personalInformation, 
    educationalBackground, 
    additionalInformation, 
    emergencyContact 
  } = usePage().props;

  const [isGCashModalVisible, setIsGCashModalVisible] = useState(false);
  const [selectedRedemptionOption, setSelectedRedemptionOption] = useState(null);
  const [gcashName, setGcashName] = useState("");
  const [gcashNumber, setGcashNumber] = useState("");
  
  const [userEvents, setUserEvents] = useState({
    data: [],
    loading: true,
    error: null
  });
  
  const [redemptionOptions, setRedemptionOptions] = useState({
    data: [],
    loading: true,
    error: null
  });

  // Fetch user events
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        // Use the exact route name 'your.events.fetch'
        const response = await axios.get(route('your.events.fetch'), {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        setUserEvents({
          data: response.data || [],
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Full error:", error);
        
        // More detailed error logging
        if (error.response) {
          console.error("Response error:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
  
        setUserEvents({
          data: [],
          loading: false,
          error: error.message || "Failed to fetch events"
        });
        
        message.error("Error fetching events: " + error.message);
      }
    };
  
    fetchUserEvents();
  }, []);

  // Fetch redemption options
  useEffect(() => {
    const fetchRedemptionOptions = async () => {
      try {
        const response = await axios.get(route("gcash.redemption.configs"), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const validOptions = (response.data || [])
          .filter(config => 
            config.points_required !== undefined && 
            config.gcash_amount !== undefined && 
            config.is_active
          )
          .map(config => ({
            points: config.points_required,
            amount: config.gcash_amount,
          }));

        setRedemptionOptions({
          data: validOptions,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching redemption options:", error);
        setRedemptionOptions({
          data: [],
          loading: false,
          error: error.message || "Failed to fetch redemption options"
        });
        message.error("Failed to load redemption options");
      }
    };

    fetchRedemptionOptions();
  }, []);

  const handleOpenGCashModal = (option) => {
    if (user?.youth_points >= option.points) {
      setSelectedRedemptionOption(option);
      setIsGCashModalVisible(true);
    } else {
      message.warning("Insufficient points for this redemption.");
    }
  };

  const handleRedeemPoints = async () => {
    try {
      const response = await axios.post(route('gcash.redeem'), {
        points: selectedRedemptionOption.points,
        amount: selectedRedemptionOption.amount,
        gcash_name: gcashName,
        gcash_number: gcashNumber
      });

      message.success(response.data.message);
      setIsGCashModalVisible(false);
      // Optionally refresh points or trigger a refetch
    } catch (error) {
      message.error(error.response?.data?.message || "Redemption failed");
    }
  };

  return (
    <AuthenticatedLayout user={user}>
      <Head title="View Profile" />
      
      <ProfileHeader user={user} />
      
      <ProfileTabs 
        user={user}
        personalInformation={personalInformation}
        educationalBackground={educationalBackground}
        additionalInformation={additionalInformation}
        emergencyContact={emergencyContact}
        userEvents={userEvents.data}
        isLoadingEvents={userEvents.loading}
        redemptionOptions={redemptionOptions.data}
        isLoadingOptions={redemptionOptions.loading}
        handleOpenGCashModal={handleOpenGCashModal}
        mustVerifyEmail={mustVerifyEmail}
        status={status}
      />

      <GCashRedemptionModal
        isVisible={isGCashModalVisible}
        onClose={() => setIsGCashModalVisible(false)}
        selectedOption={selectedRedemptionOption}
        gcashName={gcashName}
        setGcashName={setGcashName}
        gcashNumber={gcashNumber}
        setGcashNumber={setGcashNumber}
        onRedeem={handleRedeemPoints}
      />
    </AuthenticatedLayout>
  );
}