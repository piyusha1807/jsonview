import { useState } from 'react';

const useCopyToClipboard = (): any => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = (text: any) => {
    try {
      if ('clipboard' in navigator) {
        navigator.clipboard.writeText(text);
      } else {
        document.execCommand('copy', true, text);
      }
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.warn('Copy failed', error);
    }
  };

  return [isCopied, copy];
};

export default useCopyToClipboard;
