pipeline {

    agent any

    
    stages {

        stage('Packaging') {

            steps {
                
                sh 'docker build --pull --rm -f Dockerfile -t fublogfontend:latest .'
                
            }
        }

        stage('Push to DockerHub') {

            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'docker tag fublogfontend:latest chalsfptu/fublogfontend:latest'
                    sh 'docker push chalsfptu/fublogfontend:latest'
                }
            }
        }

        stage('Deploy FE to DEV') {
            steps {
                echo 'Deploying and cleaning'
                sh 'docker image pull chalsfptu/fublogfontend:latest'
                sh 'docker container stop fublogfontend || echo "this container does not exist" '
                sh 'echo y | docker container prune '
                sh 'docker container run -d --rm --name fublogfontend -p 83:80  chalsfptu/fublogfontend '
            }
        }
        
 
    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}
