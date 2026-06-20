# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-06-21
### Added
- **First-Class TypeScript Support**: Introduced the `createRhinoStore` factory function to automatically infer store keys and types.
- **useSyncExternalStore Architecture**: Swapped the internal architecture to an event-driven subscription model, drastically improving performance and completely eliminating "Provider Hell" (deeply nested context providers).

### Changed
- **[Breaking]** `RhinoProvider` no longer accepts a `store` prop. Instead, you initialize your store using `createRhinoStore`, which generates a custom provider and custom hooks.
- **[Breaking]** Removed legacy/undocumented exports `CombineProviders` and `createGlobalState`.
- **[Breaking]** Removed global legacy hooks (`useRhinoState`, `useRhinoValue`, `useSetRhinoState`). You must now use `createRhinoStore` to generate your hooks.
- `RhinoProvider` now uses a single unified React Context instead of generating a context for every state key.
