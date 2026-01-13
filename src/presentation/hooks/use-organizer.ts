import { useState } from 'react';

import { createBrowserFileSystem } from '../../infrastructure/file-system/browser-file-system';
import { createOrganizeLibrary } from '../../app/use-cases/organize-library.use-case';

export function useOrganizer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const startProcess = async (pattern: string) => {
    setStatus('loading');

    try {
      const fileSystem = createBrowserFileSystem();
      const organizeLibrary = createOrganizeLibrary(fileSystem);

      await organizeLibrary(pattern);

      setStatus('success');

      console.log('Library organized');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return {
    startProcess,
    isLoading: status === 'loading',
    status,
  };
}
