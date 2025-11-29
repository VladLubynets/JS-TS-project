import { test } from '../src/fixtures/atlassian.fixture';

test.describe('fixture-based test example', { tag: ['@fixture'] }, () => {
    test('has title', async ({ jiraPage }) => {
        // Expect a title "to contain" a substring.
        await jiraPage.goTo();

        await jiraPage.verifyTitle('For you - Jira');
    });

    test('has title double', async ({ jiraPage }) => {
        // Expect a title "to contain" a substring.
        await jiraPage.goTo();

        await jiraPage.verifyTitle('For you - Jira');
    });
});
