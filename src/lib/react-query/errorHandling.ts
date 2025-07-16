/**
 * Error Handling Utilities for React Query
 * 
 * Provides consistent error handling, logging, and user-friendly error messages
 * for all React Query operations in the travel website.
 */

// Error types that can occur in the application
export interface AppError {
  message: string
  code?: string
  status?: number
  details?: unknown
}

// Network error handling
export class NetworkError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'NetworkError'
  }
}

// API error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Error classification
export const errorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const

// User-friendly error messages
export const errorMessages = {
  [errorTypes.NETWORK_ERROR]: 'Unable to connect. Please check your internet connection and try again.',
  [errorTypes.API_ERROR]: 'Something went wrong on our end. Please try again in a moment.',
  [errorTypes.VALIDATION_ERROR]: 'Please check your input and try again.',
  [errorTypes.TIMEOUT_ERROR]: 'The request is taking longer than expected. Please try again.',
  [errorTypes.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
  
  // Specific error messages for travel website
  HOLIDAYS_FETCH_ERROR: 'Unable to load holiday packages. Please try again.',
  DESTINATIONS_FETCH_ERROR: 'Unable to load destinations. Please try again.',
  SEARCH_ERROR: 'Search is currently unavailable. Please try again later.',
  BOOKING_ERROR: 'Unable to process your booking. Please try again.',
} as const

// Error classification function
export const classifyError = (error: unknown): string => {
  if (error instanceof NetworkError) {
    return errorTypes.NETWORK_ERROR
  }
  
  if (error instanceof ApiError) {
    return errorTypes.API_ERROR
  }
  
  if (error instanceof Error) {
    if (error.message.includes('timeout')) {
      return errorTypes.TIMEOUT_ERROR
    }
    
    if (error.message.includes('validation')) {
      return errorTypes.VALIDATION_ERROR
    }
  }
  
  return errorTypes.UNKNOWN_ERROR
}

// Get user-friendly error message
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  const errorType = classifyError(error)
  return errorMessages[errorType as keyof typeof errorMessages] || errorMessages[errorTypes.UNKNOWN_ERROR]
}

// Global error handler for React Query
export const handleQueryError = (error: unknown, queryKey?: unknown[]) => {
  const errorType = classifyError(error)
  const userMessage = getUserFriendlyErrorMessage(error)
  
  // Log error for debugging
  console.error('Query Error:', {
    error,
    errorType,
    queryKey,
    timestamp: new Date().toISOString(),
  })
  
  // In a real application, you might want to:
  // - Send error to logging service (e.g., Sentry, LogRocket)
  // - Track error metrics
  // - Show toast notification to user
  // - Update global error state
  
  return {
    type: errorType,
    message: userMessage,
    originalError: error,
  }
}

// Retry logic configuration
export const retryConfig = {
  // Default retry configuration
  default: {
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  
  // Search queries - more aggressive retry
  search: {
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(500 * 2 ** attemptIndex, 10000),
  },
  
  // Critical data - less aggressive retry to avoid overwhelming servers
  critical: {
    retry: 1,
    retryDelay: () => 2000,
  },
}

// Determine if error should be retried
export const shouldRetry = (error: unknown, failureCount: number): boolean => {
  // Don't retry validation errors
  if (classifyError(error) === errorTypes.VALIDATION_ERROR) {
    return false
  }
  
  // Don't retry 4xx errors (except 408 timeout)
  if (error instanceof ApiError && error.status >= 400 && error.status < 500 && error.status !== 408) {
    return false
  }
  
  // Retry network errors and 5xx errors
  return failureCount < 3
}

// Error boundary fallback component props
export interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

// Utility to create error objects for consistent error handling
export const createError = (
  message: string,
  type: keyof typeof errorTypes = 'UNKNOWN_ERROR',
  details?: unknown
): AppError => ({
  message,
  code: type,
  details,
})