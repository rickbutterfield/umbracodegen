# umbracodegen
Generate boilerplate code for building v14+ Umbraco packages

<img src="https://raw.githubusercontent.com/rickbutterfield/umbracodegen/main/.github/assets/screenshot1.png" alt="Screenshot of a macOS terminal showing umbracodegen running" />

## Installation
`umbracodegen` can be installed with your favourite package manager. It is recommended to install the package globally rather than in individual projects to save time installing every time.

npm:
```shell
npm i umbracodegen -g
```

pnpm:
```shell
pnpm add umbracodegen -g
```

bun:
```shell
bun install umbracodegen -g
```


## Usage
To run `umbracodegen`, simply type `umb` or `umbracodegen` into your terminal.

Currently, running `umb generate [component]` will start an interactive builder to scaffold the most used types of components within the backoffice, heavily inspired by code from [Kevin Jump's TimeDashboard](https://github.com/kevinjump/TimeDashboard/)

Supported components:
- [x] sections (`ManifestSection`)
- [x] dashboards (`ManifestDashboard`)
- [x] sidebars (`ManifestSectionSidebarApp`, `ManifestMenu`, `ManifestMenuItem`)
- [ ] workspaces / workspace views (`ManifestWorkspace`)
- [ ] property editors (`ManifestPropertyEditorSchema`, `ManifestPropertyEditorUi`)
- [ ] actions (workspace / entity) (`ManifestEntityAction`, `ManifestWorkspaceAction`)
- [ ] header apps (`ManifestHeaderApp`)

## Roadmap
Some ideas for future releases include
- [ ] Set target path with an `--output|-o` option
- [ ] Scaffolding a whole package with default Lit/TypeScript/Vite tooling (running `npx create umbracodegen@latest`)
