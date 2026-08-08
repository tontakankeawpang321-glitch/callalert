export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or iframes
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

export async function shareEmergencyPayload({
  title = '🚨 แจ้งเหตุฉุกเฉิน / พิกัดกู้ชีพ',
  text,
  url
}: {
  title?: string;
  text: string;
  url?: string;
}): Promise<{ method: 'share' | 'sms' | 'copy'; success: boolean }> {
  // Try Web Share API first
  if (navigator.share && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title,
        text,
        url: url || undefined
      });
      return { method: 'share', success: true };
    } catch (e) {
      // User may have cancelled or unsupported
      if ((e as Error).name !== 'AbortError') {
        console.warn('Web share failed, falling back to SMS:', e);
      }
    }
  }

  // Fallback to SMS handler
  const smsBody = encodeURIComponent(`${text} ${url || ''}`.trim());
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const smsUrl = isIOS ? `sms:&body=${smsBody}` : `sms:?body=${smsBody}`;

  try {
    window.location.href = smsUrl;
    return { method: 'sms', success: true };
  } catch (e) {
    // Ultimate fallback: copy to clipboard
    const fullText = `${text}\n${url || ''}`.trim();
    const copied = await copyToClipboard(fullText);
    return { method: 'copy', success: copied };
  }
}

export async function shareEmergencyLocation(
  lat: number | null,
  lng: number | null,
  accuracy: number | null,
  country?: { name: string; police: string; amb: string }
) {
  const coordText = lat && lng ? `${lat.toFixed(6)}, ${lng.toFixed(6)}` : 'ไม่ทราบพิกัด';
  const mapsUrl = lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : '';
  const text = `🚨 ด่วน! ขอความช่วยเหลือฉุกเฉิน\nพิกัด GPS: ${coordText}\nความแม่นยำ: ±${
    accuracy ? Math.round(accuracy) : '?'
  } เมตร\nลิงก์แผนที่: ${mapsUrl}\nประเทศ: ${country?.name || 'Thailand'}`;

  return shareEmergencyPayload({
    title: '🚨 พิกัดแจ้งเหตุฉุกเฉิน',
    text,
    url: mapsUrl,
  });
}

