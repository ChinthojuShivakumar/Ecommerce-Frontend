import PropTypes from "prop-types";
import React from "react";


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Capture error message and any additional data
    console.error("Error:", error, errorInfo);
    this.setState({ errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col justify-center items-center font-roboto">
          <h1>Something went wrong.</h1>
          <p>Error: {this.state.errorMessage}</p>
          <a
            href={"/"}
            target="_self"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Go Back
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ErrorBoundary;
