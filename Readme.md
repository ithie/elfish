# Simple Resolver and Renderer

tbd.


---
**TOC**
- [Setup](#setup)
    - [Prerequesits](#prerequesits)
- [Development](#development)
    - [Dependency management](#dependency-management)
    - [State usage](#state-usage)

## Setup

tbd.

```typescript
export const ContractSelection = (): JSX.Element => {
  return (
    <Module
      {...{
        baseUrl: '/erleben/api/contract-selection-service/v1/contract/selection/{interactionId}',
        ContentWrapper: ContractSelectionWrapper,
        trackingNames: {
          standard: 'contract-selection',
          noSMUE: 'contract-selection-no-smue',
          notMigratable: 'contract-selection-not-migratable',
        },
        baseId: 'contract-selection',
      }}
    />
  );
};
```

### Prerequesits

tbd.

## Development

The UI Components are built with React and StyledComponents.
All source code is written in TypeScript.

### Dependency Management

### State usage