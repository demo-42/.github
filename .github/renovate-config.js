module.exports = {
    platform: 'github',
    // Author must match the one opening PRs!!
    username: 'demo42-renovate-app[bot]',
    gitAuthor: 'demo42-renovate-app <demo42-renovate-app[bot]@users.noreply.github.com>',

    // Organization setup
    autodiscover: true,
    autodiscoverFilter: [
        'demo-42/*',
        '!demo-42/admin',
        '!demo-42/.github'
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
    dependencyDashboard: true,
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

    // Repository cache settings (helps track existing PRs/branches)
    // repositoryCache: 'enabled',

    // Labels
    labels: [ 'dependency-update', 'renovate' ],

    // Assignees/Reviewers
    // assigneesFromCodeOwners: true,
    reviewersFromCodeOwners: true,

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
            description: "Keep 9.3.x line within 9.3 patches only",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.3\\./",
            allowedVersions: "9.3.x",
            dependencyDashboardApproval: false,
            groupName: "Splunk 9.3.x Patches"
        },
        {
            description: "Auto-update 9.4.x patches only",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.4\\./",
            matchUpdateTypes: [ "patch" ],
            dependencyDashboardApproval: false,
            groupName: "Splunk 9.4.x Patches"
        },
        {
            description: "Block 9.4.x minor/major updates - show in dashboard",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.4\\./",
            matchUpdateTypes: [ "minor", "major" ],
            dependencyDashboardApproval: true,
            groupName: "Splunk 9.4.x Major/Minor Available"
        }
        // GitHub Actions specific
        // {
        //     matchManagers: ['github-actions'],
        //     groupName: 'GitHub Actions',
        //     pinDigests: true,
        //     semanticCommitType: 'ci',
        //     semanticCommitScope: 'github-actions',
        //     commitMessageTopic: '{{depName}} action',
        //     prPriority: 10,
        //     stabilityDays: 3
        // },

        // Critical actions - auto-merge patches
        // {
        //     matchManagers: ['github-actions'],
        //     matchPackagePatterns: ['^actions/', '^github/'],
        //     matchUpdateTypes: ['patch', 'digest'],
        //     automerge: true,
        //     automergeType: 'branch'
        // },

        // Major updates require approval
        // {
        //     matchUpdateTypes: ['major'],
        //     dependencyDashboardApproval: true,
        //     labels: ['major-update', 'needs-review']
        // }
    ]
};