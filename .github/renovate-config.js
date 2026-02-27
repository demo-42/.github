module.exports = {
    platform: 'github',
    // Author must match the one opening PRs!! Use github app name.
    username: 'demo42-renovate-app[bot]',
    gitAuthor: 'demo42-renovate-app <demo42-renovate-app[bot]@users.noreply.github.com>',

    // Organization setup
    autodiscover: true,
    autodiscoverFilter: [
        'demo-42/*',
        '!demo-42/admin'
    ],

    // Require some config (repos without any config will be skipped after onboarding PR)
    requireConfig: 'optional',

    // Managers
    enabledManagers: [
        'github-actions',
        // 'docker',
        'regex'
    ],

    // Global settings
    dependencyDashboard: false,
    dependencyDashboardTitle: '🔄 Dependency Updates Dashboard',

    // Commit messages
    semanticCommits: 'enabled',
    commitMessagePrefix: 'chore(deps):',

    // PR settings
    prConcurrentLimit: 10,
    prHourlyLimit: 0, // No limit
    branchConcurrentLimit: 20,

    // To reduce PR rebases
    rebaseWhen: 'behind-base-branch',

    // Branch cleanup and recreation settings
    branchPrefix: 'renovate/',

    // Labels
    labels: ['dependency-update', 'renovate', 'auto-merge-enabled' ],

    // Assignees/Reviewers
    // assigneesFromCodeOwners: true,
    reviewersFromCodeOwners: true,
    // recreateClosed: true,

    // NOTE 1 review will be needed, but does not necessarily have to be from CODEOWNER
    // To allow org admins to do so, consider uncommenting and commenting line 49
    // reviewers: ["team:admins"],

    regexManagers: [
        {
            description: 'Detect Docker images in GitHub Actions matrix with renovate comments',
            managerFilePatterns: [
                '/^\\.github/workflows/.+\\.ya?ml$/'
            ],
            matchStrings: [
                "-\\s+\"(?<currentValue>[^\"]+)\"\\s+#\\s+renovate:\\s+datasource=(?<datasource>\\S+)\\s+depName=(?<depName>\\S+)"
            ],
            // depNameTemplate: '{{depName}}',
            versioningTemplate: 'docker'
        }
    ],

    // Package rules
    packageRules: [
        {
            description: "Auto-update 9.3.x patches only",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.3\\./",
            allowedVersions: "9.3.x",
            automerge: true,
            automergeType: "pr",
            minimumReleaseAge: "3 days",  // Wait for stability
            groupName: "Splunk 9.3.x Patches",
            enabled: false
        },
        {
            description: "Auto-update 9.4.x patches only",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.4\\./",
            matchUpdateTypes: [ "patch" ],
            automerge: true,
            automergeType: "pr",
            minimumReleaseAge: "3 days",  // Wait for stability
            groupName: "Splunk 9.4.x Patches",
            enabled: false
        },
        {
            description: "Notify 9.4.x minor/major updates availability",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.4\\./",
            matchUpdateTypes: [ "minor", "major" ],
            minimumReleaseAge: "3 days",  // Wait for stability
            labels: [ 'dependency-update', 'renovate', 'needs-review' ],
            groupName: "Splunk 9.4.x Major/Minor Available",
            enabled: false
        },
        // GitHub Actions specific
        {
            description: "Update public GitHub Actions",
            matchManagers: ["github-actions"],
            // Matches actions/checkout, etc.
            matchPackagePatterns: ["^actions/", "^github/"],
            groupName: "Public GitHub actions",
            // Ensures to get PRs for major updates (v4 -> v5)
            separateMajorMinor: true,
            excludePackagePatterns: ["^demo-42/"],
            labels: ['dependency-update', 'renovate', 'needs-review'],
            minimumReleaseAge: "3 days"  // Wait for stability
        },
        {
            description: "Update internal reusable workflows",
            matchManagers: ["github-actions"],
            matchPackagePatterns: ["^demo-42/"],
            groupName: "Internal Reusable Workflows",
            versioning: "docker",
            // Adding automerge
            automerge: true,
            automergeType: "pr",
            minimumReleaseAge: "3 days"  // Wait for stability
        }
    ]
};