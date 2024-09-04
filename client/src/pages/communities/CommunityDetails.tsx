import React from "react";
import { useParams } from "react-router-dom";

function CommunityDetails() {
  const { communityId } = useParams();
  return <div>This is the community details with the id of {communityId}</div>;
}

export default CommunityDetails;
