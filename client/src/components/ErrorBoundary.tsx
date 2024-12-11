import React from 'react';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Error caught in ErrorBoundary:', error, info);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError && error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
          <div className="max-w-md bg-white shadow-md rounded p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="text-gray-700 mb-4">{error.message}</p>
            <a href="/" className="text-blue-600 hover:underline">
              Go Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
