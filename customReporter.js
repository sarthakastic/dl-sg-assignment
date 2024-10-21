export default class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log('\nTest Summary:');
    console.log(
      `Test Suites: ${results.numPassedTestSuites} passed, ${results.numTotalTestSuites} total`
    );
    console.log(
      `Tests:       ${results.numPassedTests} passed, ${results.numTotalTests} total`
    );
    console.log(`Snapshots:   ${results.snapshot.total} total`);
    console.log(
      `Time:        ${(results.endTime - results.startTime) / 1000} s`
    );
  }
}
