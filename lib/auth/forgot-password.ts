/**
 * Placeholder for SMS OTP password recovery.
 * Wire to Supabase Auth phone OTP or your SMS provider.
 */
export async function sendForgotPasswordOtpBySms(_phone: string): Promise<{
  ok: boolean;
  message: string;
}> {
  return {
    ok: false,
    message: "SMS OTP is not configured yet. Contact support or use email recovery when enabled.",
  };
}
