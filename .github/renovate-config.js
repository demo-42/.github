module.exports = {
    platform: 'github',
    username: 'renovate[bot]',
    gitAuthor: 'Renovate Bot <renovate@users.noreply.github.com>',

    // Organization setup
    autodiscover: true,
    autodiscoverFilter: ['demo-42/*'],

    // Exclude certain repos
    // autodiscoverTopics: ['!admin'],

    // Managers
    enabledManagers: [
        'github-actions',
        'docker'
    ],

    // Global settings
    dependencyDashboard: true,
    dependencyDashboardTitle: '🔄 Dependency Updates Dashboard',

    // Commit messages
    semanticCommits: 'enabled',
    commitMessagePrefix: 'chore(deps):',

    // PR settings
    // prConcurrentLimit: 10,
    // prHourlyLimit: 0, // No limit
    // branchConcurrentLimit: 20,

    // Labels
    labels: ['dependency-update', 'renovate' ],

    // Assignees/Reviewers
    assigneesFromCodeOwners: true,
    reviewersFromCodeOwners: true,

    // Package rules
    packageRules: [
        {
            description: "Keep 9.3.x line within 9.3 patches only",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.3\\./",
            allowedVersions: "9.3.x",
            groupName: "Splunk 9.3.x Patches"
        },
        {
            description: "Auto-update 9.4.x patches only",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.4\\./",
            matchUpdateTypes: [ "patch" ],
            groupName: "Splunk 9.4.x Patches"
        },
        {
            description: "Block 9.4.x minor/major updates - show in dashboard",
            matchDatasources: [ "docker" ],
            matchPackageNames: [ "splunk/splunk" ],
            matchCurrentVersion: "/^9\\.4\\./",
            matchUpdateTypes: [ "minor", "major" ],
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
    ],

    // Vulnerability alerts
    // vulnerabilityAlerts: {
    //     enabled: true,
    //     labels: ['security', 'high-priority'],
    //     assignees: ['@security-team']
    // },

    // Schedule
    // schedule: ['before 5am every weekday'],
    // timezone: 'Europe/Berlin'
};