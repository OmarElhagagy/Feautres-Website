import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));
    
    // You could also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  resetError = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  }

  refreshPage = () => {
    window.location.reload();
  }

  // If we've had too many errors, suggest a full page refresh
  shouldSuggestRefresh() {
    return this.state.errorCount > 1;
  }

  renderErrorMessage() {
    const { error, errorInfo } = this.state;
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          
          <p className="text-gray-600 mb-4">
            We're sorry, but something went wrong. Please try refreshing the page or contact support if the problem persists.
          </p>
          
          <details className="mb-4 text-sm text-gray-500">
            <summary className="cursor-pointer font-medium">Error details</summary>
            <div className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              <p className="font-semibold">{error && error.toString()}</p>
              {errorInfo && (
                <pre className="mt-2 whitespace-pre-wrap text-xs">
                  {errorInfo.componentStack}
                </pre>
              )}
            </div>
          </details>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={this.resetError}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Try Again
            </button>
            
            <button
              onClick={this.refreshPage}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Refresh Page
            </button>
            
            {this.shouldSuggestRefresh() && (
              <Link 
                to="/"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 text-center"
                onClick={() => {
                  this.resetError(); 
                  localStorage.clear();
                }}
              >
                Go to Home
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorMessage();
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 