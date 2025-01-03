export function handleDNSError(error: any): Error {
  if (error.message.includes('Rate limit')) {
    return new Error('Rate limit exceeded. Please wait a minute before trying again.');
  }
  
  if (error.message.includes('Failed to fetch')) {
    return new Error('Network error. Please check your connection.');
  }

  return error instanceof Error ? error : new Error('An unknown error occurred');
}