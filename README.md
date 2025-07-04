# ChallengeMindataBaez

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## JSON Server

This project uses `json-server` to simulate a backend API for development purposes. The API serves data from the `db.json` file located in the root directory.

To start the JSON server, run:

```bash
npm run serve:json
```

The API will be available at `http://localhost:3000`. For example:

- `GET /heros` will return the list of heroes.
- `POST /heros` can be used to add a new hero.

You can also run both the Angular development server and the JSON server simultaneously using:

```bash
npm run start
```

This will start the Angular app on `http://localhost:4200` and the JSON server on `http://localhost:3000`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Environment Variables

This project uses environment-specific configurations to determine the API endpoint for the application. These configurations are defined in the `src/environments` directory.

### Production Environment

In the production environment (`ng build --configuration production`), the application is configured to use the following API endpoint:

```
https://riu-backend-josue-baez.onrender.com
```

This API is hosted on [Render](https://render.com/) under a free tier. Please note:

- The API may take some time to initialize when it is first accessed after being idle.
- If the API remains inactive for a certain period, it will automatically shut down and require reinitialization upon the next request.

### Development Environment

In the development environment (`ng serve` or `npm run start`), the application is configured to use a local `json-server` instance as the API:

```
http://localhost:3000
```

This allows for rapid development and testing without relying on the production API. To start the `json-server`, run:

```bash
npm run serve:json
```

You can also run both the Angular development server and the `json-server` simultaneously using:

```bash
npm run start
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Author

Created by [Josué Baez](https://www.linkedin.com/in/josuebaez15/).
