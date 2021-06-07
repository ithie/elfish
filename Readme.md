# Elfish

---
**TOC**
- [Setup](#setup)
    - [Prerequesits](#prerequesits)
- [Development](#development)
    - [Dependency management](#dependency-management)
    - [Rendering and ReRendering](#rendering-and-re-rendering)
    - [State usage](#state-usage)

## Setup

tbd.

### Prerequesits

#### Basic usage at a glance

##### Define component

```typescript
window.registerComponent(
    'Absolute/Path/To/Item',
    [
        'Absolute/Path/To/Single/Dependency/1',
        'Absolute/Path/To/Single/Dependency/2',
        // ... and so on
        'system/global/state' // the global store is used as an import
    ],
    ([
      Dependency1,
      Dependency2,
      //... and so on
      globalState,
    ]) => {
        return functionToBeExecutedWhileRendering(
          props,
          children,
          [state, setState] // the locally used, component-centric state is ALWAYS the last parameter!
        ) => {
          return createTag(
            // explained below
          );
        }
    }
);
```

#### Define utillity

```typescript

window.registerUtil(
    'Absolute/Path/To/Item',
    [
        'Absolute/Path/To/Single/Dependency/1',
        'Absolute/Path/To/Single/Dependency/2',
        ...
    ],
    ([ ObjectContainingAllDependencies ]) => {
        return functionToBeExecuted(params) => {
          return 'any return-value';
        }

        // or

        var configurationObject = {
          item1: 'Value',
          item2: 'Value',
        };
        return configurationObject;
    }
);
```

## Development

The UI Components are built with React and StyledComponents.
All source code is written in TypeScript.

### Dependency Management

```typescript
window.registerComponent(
    'Absolute/Path/To/Component',
    [
        'Absolute/Path/To/Dependency',
    ],
    ([ ObjectContainingAllDependencies ]) => {
        ...
    }
);
```

#### Register components and utils

#### Access components

```typescript
window.registerComponent(
    './modules/Water/Water',
    [
        './constants/constants',
    ],
    ([ { tileStyles } ]) => {
        ...
    }
);
```

### Rendering and Re-Rendering

### State usage

#### Globally accessible state

#### Component-centric state