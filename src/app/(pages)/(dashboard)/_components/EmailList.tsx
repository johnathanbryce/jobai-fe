import React from "react";
import { Email } from "../_types/email-types";

interface EmailListProps {
  emails: Email[];
}

const EmailList = ({ emails }: EmailListProps) => {
  if (!emails || !emails.length) {
    return <div>Loading emails...</div>;
  }

  return (
    <div>
      {emails.map((email: Email) => (
        <div key={email.id} className="email-card">
          <h3>{email.subject}</h3>
          <p>{email.snippet}</p>
          <small>From: {email.sender}</small>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
