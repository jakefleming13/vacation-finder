# VacationFinder

VacationFinder is a full-stack web application that allows users to **create an account, log in, view, and reserve various vacation destinations**. Users also have the exciting option to **create their own vacation listings**, complete with details stored in DynamoDB and associated images uploaded to an S3 bucket. This project showcases a modern, serverless architecture built entirely on AWS.

## Technologies Used

This project was built leveraging the power of **AWS Cloud Development Kit (CDK) with TypeScript** for infrastructure-as-code, coupled with a responsive **React application** for the front-end.

**Backend & Infrastructure:**
* **AWS Lambda:** Serverless compute for handling API logic.
* **Amazon API Gateway:** Exposing secure and scalable REST APIs.
* **Amazon DynamoDB:** NoSQL database for storing vacation and user data.
* **Amazon S3:** Scalable object storage for vacation images.
* **AWS Amplify:** Simplifies front-end integration with AWS backend services (authentication).
* **AWS Cognito:** User directory for authentication and authorization.
* **AWS CodePipeline:** Continuous Integration and Continuous Delivery (CI/CD) for automated deployments.
* **TypeScript:** Primary language for both CDK infrastructure and Lambda functions.

**Frontend:**
* **React:** A declarative, component-based JavaScript library for building user interfaces.
* **TypeScript:** Type-safe JavaScript for robust frontend development.
* **Tailwind CSS:** A utility-first CSS framework for rapid and consistent UI styling.
* **React Router DOM:** For declarative navigation within the React application.

---

## Features

* **User Authentication:** Secure user registration, login, and logout powered by AWS Cognito and Amplify.
* **Vacation Listing:** Browse a variety of vacation destinations.
* **Vacation Creation:** Users can create new vacation entries, including details and an associated photo.
* **Vacation Reservation:** Reserve a vacation from the available listings.
* **Image Uploads:** Seamlessly upload vacation photos to an S3 bucket.
* **Responsive Design:** A modern, mobile-friendly user interface.

---

## What I Learned/Did During This Project

This project served as a comprehensive learning experience, covering a wide array of AWS, TypeScript, and React development topics:

### AWS & Serverless Architecture
* **Infrastructure as Code (IaC):** Wrote and managed AWS infrastructure using **AWS Cloud Development Kit (CDK)**.
* **Multi-Stack Deployments:** Handled multiple CloudFormation stacks with CDK to organize resources and reduce the blast radius of deployments.
* **CDK Fundamentals:** Gained basic usage knowledge of CDK constructs (L1, L2, L3), outputs, and parameters.
* **CI/CD Pipelines:** Built robust CI/CD pipelines for CDK applications using **AWS CodePipeline**.
* **Serverless API Development:** Implemented serverless APIs using a combination of **AWS Lambda, API Gateway, DynamoDB, and S3**.
* **Intermediate CDK:** Explored advanced CDK topics such as intrinsic functions, aspects, and cross-stack references for complex deployments.
* **CDK Code Testing:** Practiced CDK code testing methodologies, including declarative tests, matchers, captors, and snapshot testing.
* **Multiple Tenant Applications:** Implemented multi-tenant authentication and authorization using **AWS Cognito and Amplify**.
* **AWS SDK Calls:** Learned to make AWS SDK calls from various parts of the application.
* **IAM & CloudWatch:** Gained experience with **AWS IAM** for access control and **AWS CloudWatch** for monitoring and logging.

### Frontend Development
* **React with TypeScript:** Built a modern single-page application (SPA) using **React** and **TypeScript**.
* **UI Styling:** Utilized **Tailwind CSS** for efficient and component-driven styling, ensuring a modern and consistent look and feel across the application.
* **Routing:** Implemented client-side routing using `react-router-dom`.

### General Development Practices
* **TypeScript Mastery:** Deepened understanding of both basic and advanced **TypeScript** topics, enhancing code quality and maintainability.
* **CDK Best Practices:** Applied best practices for organizing, structuring, and deploying CDK applications.

---

## Getting Started

To run this project locally or deploy it to your AWS account, follow these steps:

1.  **Prerequisites:**
    * Node.js (LTS version)
    * AWS CLI configured with appropriate credentials
    * AWS CDK CLI (`npm install -g aws-cdk`)
    * npm or yarn

2.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd VacationFinder
    ```

3.  **Backend Deployment (AWS CDK):**
    * Navigate to the `vacation-finder-model` (or similar infrastructure) directory.
    * Install dependencies: `npm install`
    * Bootstrap CDK (if not already done for your AWS account/region): `cdk bootstrap aws://YOUR-ACCOUNT-ID/YOUR-AWS-REGION`
    * Deploy the stacks: `cdk deploy --all` (or deploy individual stacks as needed)
    * Note down the outputs, especially `VacationUserPoolId`, `VacationUserPoolClientId`, `VacationIdentityPoolId`, and API Gateway endpoint URLs. These will be used in the frontend configuration.

4.  **Frontend Setup (React):**
    * Navigate to the `[YOUR_FRONTEND_DIRECTORY]` (e.g., `frontend` or `react-app`).
    * Install dependencies: `npm install`
    * **Configure AWS Amplify:** Create a file (e.g., `src/aws-exports.js` or `src/config.ts`) and add your Cognito User Pool and Identity Pool IDs, Client ID, and AWS Region obtained from the CDK outputs. Example:
        ```javascript
        // src/aws-exports.js (or similar config file)
        import { Amplify } from 'aws-amplify';

        Amplify.configure({
            Auth: {
                Cognito: {
                    userPoolId: 'YOUR_USER_POOL_ID',
                    userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID',
                    identityPoolId: 'YOUR_IDENTITY_POOL_ID',
                    region: 'YOUR_AWS_REGION', // e.g., 'us-east-2'
                }
            },
            API: {
                REST: {
                    VacationFinderApi: { // Choose a name for your API
                        endpoint: 'YOUR_API_GATEWAY_ENDPOINT',
                        region: 'YOUR_AWS_REGION',
                    }
                }
            }
        });
        ```
    * Run the development server: `npm start`

5.  **Access the Application:**
    * Open your web browser and navigate to `http://localhost:3000` (or whatever port `npm start` indicates).

---

## License

This project is open-source and available under the [MIT License](LICENSE).
(Note: You'll need to create a `LICENSE` file if you choose the MIT License or specify another one.)

---
