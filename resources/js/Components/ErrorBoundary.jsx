import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI in case of error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service if needed
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error is caught
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children; // Render child components if there's no error
  }
}

export default ErrorBoundary;
