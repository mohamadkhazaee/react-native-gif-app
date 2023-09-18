## Tech Stack

- Expo CLI: Chosen for cross-platform mobile app development, especially due to time limitations and its easier initial setup compared to React Native CLI.
- React Navigation: Handles app navigation and screen transitions.
- Axios: Used for handling HTTP requests to fetch data from the GIPHY API.
- react-native-dotenv: Saves environment variables like BASE_URL and API_KEY securely.
- ESLint and Prettier: Used for code formatting and maintaining a consistent code style.
- Jest and @testing-library/react-native: Implemented for component tests to ensure reliability.

## App Architecture

The app follows a component-based architecture where each screen is represented by a separate component. The main app component acts as the entry point, rendering different screens based on the navigation stack. Navigation between screens is handled using React Navigation, providing a seamless user experience. The use of React hooks and functional components enhances code readability and maintainability.

## Project Setup and Run

To set up the project and run it on your local development environment, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `yarn install`.
3. Create a .env file in the root directory of the project and add the environment variables.

Running the App:

- For iOS: Use `yarn ios`.
- For Android: Use `yarn android`.

## Environment Variables

The project uses `react-native-dotenv` to manage environment variables. The following environment variables are used:

- BASE_URL: The base URL for making HTTP requests to the GIPHY API.
- API_KEY: The API key required for accessing the GIPHY API.

Please ensure to create a `.env` file in the root directory of the project and add the required environment variables with their respective values.

## Testing

Component tests have been implemented using `Jest` and `@testing-library/react-native`. These tests ensure the reliability and robustness of the components.

## Emulators

The app has been tested on the following emulators:

- Pixel 4 API 31 (Android)
- iPhone SE (3rd generation) iOS 16.4 (iOS)
