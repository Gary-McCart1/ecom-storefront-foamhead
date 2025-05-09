import React from "react";

const TrustBadge = () => {
  return (
    <div className="mt-4 flex items-center justify-between mx-auto text-sm text-gray-600 w-3/4">
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-green-600">✅</span>
        <p>Secure Checkout</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-yellow-600">🔄</span>
        <p>30-Day Returns</p>
      </div>
    </div>
  );
};

export default TrustBadge;
