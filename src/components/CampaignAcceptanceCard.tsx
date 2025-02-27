import React from 'react';
import { CalendarCheck, ExternalLink } from 'lucide-react';

interface CampaignAcceptanceCardProps {
  campaignName: string;
  campaignLink: string;
  acceptanceDate: string;
  isCreatorView?: boolean;
}

export const CampaignAcceptanceCard = ({
  campaignName,
  campaignLink,
  acceptanceDate,
  isCreatorView = false,
}: CampaignAcceptanceCardProps) => {
  return (
    <div className="border-opacity-25 border-primary card p-4 shadow-sm w-100 my-3" style={{maxWidth: '28rem'}}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <CalendarCheck className="text-primary" style={{width: '1.25rem', height: '1.25rem'}} />
          <h3 className="fw-medium text-dark mb-0">
            {isCreatorView ? 'Accepted to Campaign' : 'Creator Accepted'}
          </h3>
        </div>
        <span className="small text-gray">Feb 26, 2024</span>
      </div>
      
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <p className="text-secondary fw-medium mb-0">Summer Collection 2024</p>
        </div>
        <a 
          href={campaignLink}
          className="d-flex align-items-center gap-1 text-primary text-decoration-none small fw-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Campaign
          <ExternalLink style={{width: '1rem', height: '1rem'}} />
        </a>
      </div>
    </div>
  );
}