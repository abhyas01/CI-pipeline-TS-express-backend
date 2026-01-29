pipeline {
  agent any

  tools {
    nodejs 'node-20'
  }

  environment {
    CI = 'true'
    PORT = '3000'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Runtime') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Code Quality - ESLint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Code Quality - Prettier') {
      steps {
        sh 'npm run format:check'
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
      }
    }
  }

  post {
    failure {
      echo '''
        Pipeline failed.
        Fix Locally with:
        - Install: npm ci
        - Lint: npm run lint
        - Format: npm run format
        - Tests + coverage: npm run test:ci
        - Build: npm run build
      '''
    }
  }
}
