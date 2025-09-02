// Mock Data Configuration
export const MOCK_CONFIG = {
  // Set to true to use mock data, false to use real API
  USE_MOCK_DATA: true,
  
  // Mock data delay simulation (in milliseconds)
  MOCK_DELAY: 500,
  
  // Mock data pagination settings
  MOCK_PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  }
}

// Helper function to simulate API delay
export const simulateApiDelay = (delay: number = MOCK_CONFIG.MOCK_DELAY): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

// Helper function to check if mock data should be used
export const shouldUseMockData = (): boolean => {
  return MOCK_CONFIG.USE_MOCK_DATA
}
