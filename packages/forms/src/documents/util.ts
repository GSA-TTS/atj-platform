export const stringToBase64 = (input: string): string => {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(input, 'utf-8').toString('base64');
  } else {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(input);
    let binaryString = encoded.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ''
    );
    return window.btoa(binaryString);
  }
};

export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
  return new Promise<string>((resolve, reject) => {
    const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
    const reader = new FileReader();
    reader.onloadend = function () {
      // Convert the data URL to a base64 string
      const base64 = (this.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
