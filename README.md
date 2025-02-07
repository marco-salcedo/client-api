# Mini API Client Challenge

A React-based coding challenge to build the logic for a simple API client interface with state management, async calls, and optimization requirements.

> 🔴 IMPORTANT: Delete last commit before sharing with candidate

## Overview

<img width="1112" alt="image" src="https://github.com/user-attachments/assets/edcf3181-92bd-48b1-85cb-bf24ff52413e" />

This challenge involves implementing a mini API client interface that allows users to make HTTP requests and view responses. The interface includes method selection, URL input, request body configuration, and response display areas. Be sure to make use of TypeScript to type component state, functions and variables.

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Requirements

### 1. State Management

- Implement component state to track and display the most recent request details in the "Request Container"
- Display request method, URL, and body (if applicable)

### 2. Async Functionality

- Utilize the provided `mockFetch` utility to simulate API calls
- The `mockFetch` function:
  - Accepts URL, method, and optional body parameters
  - Includes a 1-second simulated delay
  - Returns a mock response with request details
- Display response data in the "Response Container"

### 3. Error Handling

- Implement error handling for failed requests
- The `mockFetch` utility throws an error when the URL includes the word "error"
- Display errors distinctly in the "Response Container"

### 4. Initial Status Check

- Implement an imaginary status check on component mount
- Make a GET request to "https://on-mount.com/status"
- Hide UI until the status response is received

### 5. Performance Optimization

- Optimize the integration of a large component (`HugeComponent`)
- Address performance issues related to:
  - Initial load time
  - Re-render efficiency

# Evaluation Criteria

- TypeScript implementation
- State management implementation
- Error handling approach
- Loading state management
- Performance optimization techniques
- Code organization and clarity

## Technical Details

### Mock Fetch Utility

- Simulates network requests with a 1-second delay
- Returns a Promise resolving to a mock Response object
- Throws an error if URL contains "error"
- Response includes original request details in the data

## UI Components Available

- Button
- Input
- DropdownMenu
- Textarea
- Separator
- Spinner
