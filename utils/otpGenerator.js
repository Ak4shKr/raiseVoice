export const otpGenerator = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  // console.log(otp);
  return otp;
};
