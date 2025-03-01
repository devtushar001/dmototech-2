import Razorpay from 'razorpay';  // Import Razorpay correctly (with uppercase 'R')

export const razorPayInstance = (razorPayKeyId, razorPayKeySecret) => {
  return new Razorpay({
    key_id: razorPayKeyId,
    key_secret: razorPayKeySecret
  });
};