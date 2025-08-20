## Scaling: How would you design the app’s backend to handle 100k+ concurrent users?
I’d design the backend as containerized microservices deployed on AWS Fargate, fronted by an Application Load Balancer with auto-scaling. Services will be stateless and use ElastiCache (Redis) for session management. For the database, I’d enable read replicas and caching layers. We’d also rely on CloudWatch for monitoring and alarms for proactive scaling.

---

## CI/CD: How would you set up continuous deployment for React Native + AWS?
I’d set up a CI/CD pipeline with AWS CodePipeline + CodeBuild to build the React Native app and Docker images. Images go to ECR, and ECS/Fargate services pull the latest version automatically through CodeDeploy. For React Native, I’d integrate Fastlane or AppCenter to automate APK/IPA builds and push them to the respective app stores. This way, backend + mobile builds are fully automated.

---

## Team workflow: How do you ensure fast iteration without sacrificing code quality?
We enforce local linting and formatting, and use SonarCloud to catch code smells. Every PR is reviewed by both AI tools and humans. We document patterns with examples and do monthly tech debt reviews. To balance speed and quality, we use feature flags for safe releases and maintain automated tests (unit, integration, e2e) as part of CI/CD. Branching strategy (e.g., trunk-based) ensures smooth collaboration.

---