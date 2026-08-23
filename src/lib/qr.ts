import QRCode from 'qrcode';

export async function generateQrDataUrl(text: string, options?: QRCode.QRCodeToDataURLOptions): Promise<string> {
  try {
    const defaultOptions: QRCode.QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 280,
      color: {
        dark: '#221F1E',
        light: '#FFFFFF'
      },
      ...options
    };
    return await QRCode.toDataURL(text, defaultOptions);
  } catch (err) {
    console.error('QR Code generation failed:', err);
    return '';
  }
}

export function generateUpiUrl(params: {
  pa: string; // UPI ID (e.g. ulu.ins.library@sbi)
  pn: string; // Payee Name (e.g. Uluberia Institute and Library)
  am?: string; // Amount (optional)
  tn?: string; // Note / Transaction note
}): string {
  const { pa, pn, am, tn } = params;
  let url = `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}`;
  if (am) url += `&am=${encodeURIComponent(am)}`;
  if (tn) url += `&tn=${encodeURIComponent(tn)}`;
  url += '&cu=INR';
  return url;
}
