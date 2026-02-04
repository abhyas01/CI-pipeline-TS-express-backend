pipeline {
  agent {
    docker {
      image 'node:20-bullseye'
      args '-u root:root'
    }
  }

  // Stop auto-checking from Jenkins to checkout SCM before
  // As git is not installed inside node:20-bullseye docker container
  options {
    skipDefaultCheckout(true)
  }

  environment {
    CI = 'true'
    PORT = '3000'
  }

  stages {
    stage('Checkout') {
      steps {
        // install git inside the container before checkout
        sh 'apt-get update -y'
        sh 'apt-get install -y git ca-certificates'

        // sanity checks
        sh 'git --version'
        sh 'node -v'
        sh 'npm -v'

        // checkout - because git exists
        checkout scm
      }
      post {
        failure {
          echo '''
          Checkout failed.
          What to check:
          - Is the repository URL correct?
          - Does Jenkins have GitHub credentials configured (recommended)?
          - If you see GitHub API rate limiting, add a GitHub token in Jenkins credentials.
          '''
        }
      }
    }

    stage('Runtime') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
      post {
        failure {
          echo '''
          Runtime check failed.
          What to check:
          - Ensure Node.js tool "node-20" is installed/configured in Jenkins (Global Tool Configuration).
          - Ensure the agent has access to that tool installation.
          '''
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
      post {
        failure {
          echo '''
          Dependency installation failed (npm ci).
          Fix locally:
          - npm ci

          Common causes:
          - package-lock.json is missing or out of sync with package.json (commit the lockfile)
          - Node/npm version mismatch (use Node 20)
          '''
        }
      }
    }

    stage('Code Quality - ESLint') {
      steps {
        sh 'npm run lint'
      }
      post {
        failure {
          echo '''
          ESLint failed (code quality).
          Fix locally:
          - npm ci
          - npm run lint

          Tip:
          - The first ESLint error above usually includes the exact file and line number to fix.
          '''
        }
      }
    }

    stage('Code Quality - Prettier') {
      steps {
        sh 'npm run format:check'
      }
      post {
        failure {
          echo '''
          Prettier formatting check failed.
          Fix locally:
          - npm ci
          - npm run format
          - npm run format:check

          Tip:
          - format:check verifies formatting; format will auto-fix formatting issues.
          '''
        }
      }
    }

    stage('Tests + Coverage') {
      steps {
        sh 'npm run test:ci'
      }
      post {
        always {
          archiveArtifacts artifacts: 'coverage/**,reports/**', fingerprint: true
        }
        failure {
          echo '''
          Tests failed (npm run test:ci).
          Fix locally:
          - npm ci
          - npm run test:ci

          What to check:
          - Look for the first failing test name in the logs above
          - If this is an ESM/Jest VM modules issue, confirm project config matches the local setup
          - Coverage thresholds may also cause failures (check coverage summary)
          '''
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
        sh 'test -f dist/server.js'
      }
      post {
        always {
          archiveArtifacts artifacts: 'dist/**', fingerprint: true
        }
        failure {
          echo '''
          Build failed or expected output missing (dist/server.js).
          Fix locally:
          - npm ci
          - npm run build

          What to check:
          - Ensure your build outputs to dist/server.js (tsconfig outDir / build script)
          - If the entry file name differs, update the validation command accordingly
          '''
        }
      }
    }
  }

  post {
    failure {
      echo '''
      Pipeline failed.
      Suggested local fix sequence:
      1) Install: npm ci
      2) Lint: npm run lint
      3) Format check: npm run format:check (or auto-fix with: npm run format)
      4) Tests + coverage: npm run test:ci
      5) Build: npm run build

      Tip:
      - Scroll to the first failing stage above for the most specific error message.
      '''
    }
  }
}