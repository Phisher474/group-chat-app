# AWS RDS connectivity & IAM Debugging

## Task 1: Identify at least two possible causes of the authentication failure.

1. **Password Rotated but DB User Not Updated**  
   - If Secrets Manager automatic rotation fails mid-process, the secret may update but the DB password may not.  
   - Result → Lambda fetches new secret, but Postgres still expects the old password.  
   - **Fix:** Check rotation Lambda logs (`/aws/lambda/secretsmanager-<rotation-function>` in CloudWatch). If out of sync, reset password manually.

2. **Secret Rotation Frequency Too Short**  
   - Rotating too frequently (e.g., every 1–2 days) may cause Prisma’s pooled connections to hold stale credentials.  
   - Result → `FATAL: password authentication failed` until connections refresh.  
   - **Fix:** Rotate secrets at a practical interval (30–60 days) and ensure Prisma re-establishes connections.

---


## Task 2: Write a short guide for how to connect Prisma running inside a Lambda to an RDS Postgres instance the correct way (include mention of RDS Proxy, Secrets Manager, or IAM authentication if relevant).

Here’s the short steps including the Prisma layer:

- Set up RDS Postgres in a private subnet.
- Create RDS Proxy in front of the DB.
- Store DB credentials in Secrets Manager (or enable IAM auth).
- Build Prisma Client locally (e.g. prisma generate).
- Package Prisma Client + query engine into a Lambda Layer.
- Attach the Prisma Layer to your Lambda function.
- Attach IAM role to Lambda with secretsmanager:GetSecretValue and/or rds-db:connect.
- Inside Lambda, load DB credentials from Secrets Manager or generate IAM auth token.
- Initialize Prisma Client (singleton) with RDS Proxy endpoint.
- Run Lambda in same VPC + subnets + SGs as RDS Proxy.

---


## Task 3: Suggest one improvement to hardening this setup (e.g., rotating secrets, IAM role–based DB auth).

A strong improvement here would be to move away from long-lived database passwords in Secrets Manager and instead use IAM role–based authentication with RDS.

**With IAM auth:**
- Your Lambda function assumes an IAM role that has rds-db:connect permissions.
- Prisma (via the PostgreSQL driver) can request a short-lived IAM authentication token instead of relying on a static password.
- Tokens automatically expire (default 15 minutes), which removes the risk of password leaks or stale secrets.
- This also eliminates the operational burden of rotating passwords in Secrets Manager.

In short: Enable IAM authentication for your RDS instance and update Lambda/Prisma to use IAM tokens instead of stored passwords.
---