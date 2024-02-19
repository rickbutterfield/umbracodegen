# umbracodegen
Generate boilerplate code for building v14+ Umbraco packages

<img src="https://raw.githubusercontent.com/rickbutterfield/umbracodegen/main/.github/assets/screenshot1.png" alt="Screenshot of a macOS terminal showing umbracodegen running" />

## Usage

Currently, running `umb generate [component]` will start an interactive builder to scaffold the most used types of components within the backoffice, heavily inspired by code from [Kevin Jump's TimeDashboard](https://github.com/kevinjump/TimeDashboard/)

Supported components:
- [x] sections (`ManifestSection`)
- [x] dashboards (`ManifestDashboard`)
- [x] sidebars (`ManifestSectionSidebarApp`, `ManifestMenu`, `ManifestMenuItem`)
- [ ] workspaces / workspace views (`ManifestWorkspace`)
- [ ] property editors (`ManifestPropertyEditorSchema`, `ManifestPropertyEditorUi`)
- [ ] actions (workspace / entity) (`ManifestEntityAction`, `ManifestWorkspaceAction`)
- [ ] header apps (`ManifestHeaderApp`)
