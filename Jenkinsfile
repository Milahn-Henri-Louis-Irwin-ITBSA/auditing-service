pipeline {
    agent any

    tools {
        nodejs "nodejs" // Use the same name you configured in Jenkins Global Tool Configuration
    }

    stages {
        stage('Example') {
            steps {
                sh 'npm config ls'
            }
        }

        stage('Checkout') {
            steps {
                git(url: 'https://github.com/Milahn-Henri-Louis-Irwin-ITBSA/flights-service', branch: 'main')
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run prod'
            }
        }

        stage('Deploy') {
            steps {
                // Create the directory '/root/microservices/firebase-admin-service' if it doesn't exist
                sh 'mkdir -p /root/microservices/flights-service'

                // Move the 'dist' directory to '/root/microservices/firebase-admin-service'
                sh 'mv dist /root/microservices/flights-service'

                // Move the 'node_modules' directory to '/root/microservices/firebase-admin-service'
                sh 'mv node_modules /root/microservices/flights-service'
            }
        }
    }
}
