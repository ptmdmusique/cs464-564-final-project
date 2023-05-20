"use client";

import React from "react";
import { Spinner } from "react-bootstrap";

export const LoadingSpinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center mt-4">
      <Spinner animation="border" variant="primary" role="status" />
      <p className="mb-0 ms-2">Loading ...</p>
    </div>
  );
};
