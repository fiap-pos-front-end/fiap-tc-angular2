# FiapTcAngular2

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4202/`. The application will automatically reload whenever you modify any of the source files.

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
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Concepts Used

1. **Clean Architecture**
  - Clear separation between domain, application, and infrastructure layers.
  - Independence of the domain layer from external frameworks and libraries.
  - Dependency inversion to improve flexibility and maintainability.

2. **Clean Architecture**
   - Integration with other microfrontends.
   - Dynamic loading of remote modules.
   - Dependency sharing across applications.

3. **Design Patterns**
   - Repository Pattern for data abstraction.
   - Factory Method for object creation.
   - Dependency Injection for inversion of control.
  
4. **Application Performance**
   - Optimization of change detection using ChangeDetectionStrategy.OnPush, reducing unnecessary re-rendering.
   - Implementation of Lazy Loading to reduce the initial application load time.
   - Use of Signals for more efficient and performant local state management.
   - Application of trackBy in lists to prevent unnecessary DOM re-creation.
   - Use of Observables to handle asynchronous operations in a reactive and safe manner.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
